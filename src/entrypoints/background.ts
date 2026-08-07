import { db, getProfile } from "@/lib/db";
import { onMessage, sendMessage } from "@/lib/message";
import type { ResumeObject } from "@/lib/workspace";

const activeContentScriptTabs = new Set<number>();

let pendingOnboarding = false;

export default defineBackground(() => {
	browser.action.onClicked.addListener((tab) => {
		if (!tab?.id) return;
		console.log("icon click event");
		sendMessage("TOGGLE_UI", undefined, tab.id);
	});

	onMessage("CONTENT_SCRIPT_MOUNTED", ({ sender }) => {
		if (sender.tab?.id) activeContentScriptTabs.add(sender.tab.id);
		console.log("tab", sender.tab?.id, "joined the pool");
	});

	onMessage("CONTENT_SCRIPT_UNMOUNTED", ({ sender }) => {
		if (sender.tab?.id) activeContentScriptTabs.delete(sender.tab.id);
		console.log("tab", sender.tab?.id, "left the pool");
	});

	onMessage("OPEN_OPTIONS", () => {
		browser.runtime.openOptionsPage();
	});

	onMessage("GET_WORKSPACES_META", () => {
		return db.workspaceMeta.toArray();
	});

	onMessage("PREVIEW", ({ data }) => {
		browser.tabs.create({
			url: browser.runtime.getURL(`/preview.html?id=${data}`),
		});
	});

	onMessage("GET_WORKSPACE_DATA", ({ data }) => {
		console.log("workspaceid", data);
		return db.workspaces.get(data).then((d) => d ?? null);
	});

	onMessage("HAS_BLOB", async ({ data }) => {
		const upload = await db.uploads.get(data);
		if (!upload) return null;

		const resume: ResumeObject = {
			id: upload.id,
			uploadedAt: upload.createdAt,
		};
		return resume;
	});

	onMessage("GET_PROFILE", async () => {
		const data = await getProfile();
		return data;
	});

	onMessage("OPTIONS_PAGE_READY", () => {
		if (pendingOnboarding) {
			pendingOnboarding = false;
			sendMessage("START_ONBOARDING");
		}
	});

	const broadcastToContentScripts = (
		type: "WORKSPACES_UPDATED" | "PROFILE_UPDATED",
	) => {
		console.log(type);
		console.log("pool:", activeContentScriptTabs);
		activeContentScriptTabs.forEach((tabId) => {
			sendMessage(type, undefined, tabId).catch(() => {
				activeContentScriptTabs.delete(tabId);
				console.log("stale tab", tabId, "flushed from the pool");
			});
		});
	};

	onMessage("WORKSPACES_UPDATED", () =>
		broadcastToContentScripts("WORKSPACES_UPDATED"),
	);
	onMessage("PROFILE_UPDATED", () =>
		broadcastToContentScripts("PROFILE_UPDATED"),
	);

	browser.runtime.onInstalled.addListener(async (details) => {
		if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
			pendingOnboarding = true;
			await browser.runtime.openOptionsPage();
		}
	});

	console.log("brevity background script active");
});
