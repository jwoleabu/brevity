import Dexie, { type Table } from "dexie";
import type { PublicPath } from "wxt/browser";
import type {
	Profile,
	SettingRecord,
	Settings,
	Upload,
	Workspace,
	WorkspaceMeta,
} from "./workspace";

class BrevityDB extends Dexie {
	workspaces!: Table<Workspace, string>;
	workspaceMeta!: Table<WorkspaceMeta, string>;
	settings!: Table<SettingRecord, keyof Settings>;
	uploads!: Table<Upload, string>;
	constructor() {
		super("BrevityDB");
		this.version(1).stores({
			workspaces: "id, name, createdAt, updatedAt",
			workspaceMeta: "id, updatedAt",
			settings: "key",
			uploads: "id, name, createdAt, updatedAt",
		});
	}
}

export const db = new BrevityDB();

export async function createMockWorkspace(name: string): Promise<Workspace> {
	const url = browser.runtime.getURL(
		`/mock/workspaces/${name}.json` as PublicPath,
	);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`No workspace template found for "${name}" (${url})`);
	}
	const template = (await response.json()) as Workspace;

	await db.transaction("rw", db.workspaces, db.workspaceMeta, async () => {
		await db.workspaces.add(template);
		await db.workspaceMeta.add({
			id: template.id,
			name,
			updatedAt: template.updatedAt,
			createdAt: template.createdAt,
		});
	});

	return template;
}

export async function createMockUser(name: string): Promise<Profile> {
	const url = browser.runtime.getURL(`/mock/users/${name}.json` as PublicPath);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`No user template found for "${name}" (${url})`);
	}
	const template = (await response.json()) as Profile;

	await db.settings.put({ key: "profile", value: template });

	return template;
}

export async function createNewWorkspace(name: string): Promise<Workspace> {
	const now = Date.now();
	const workspace: Workspace = {
		id: crypto.randomUUID(),
		name,
		createdAt: now,
		updatedAt: now,
		profileOverride: {},
		education: [
			{
				id: "anansna",
				schoolName: "University of Square",
				degree: "Bachelors",
				fieldOfStudy: "Computer Science",
				startDate: { month: 4, year: 2005 },
				endDate: { month: 8, year: 2006 },
			},
		],
		experience: [
			{
				id: crypto.randomUUID(),
				companyName: "Square Company",
				title: "Software Engineer",
				employmentType: "Contract",
				location: "Beach City",
				startDate: { month: 1, year: 2026 },
				endDate: { month: 5, year: 2026 },
				isCurrent: true,
				description: "Lorem Ipsum",
			},
		],
		links: [
			{ id: crypto.randomUUID(), label: "github", url: "github.com" },
			{ id: crypto.randomUUID(), label: "linkedin", url: "linkedin.com" },
			{ id: crypto.randomUUID(), label: "portfolio", url: "mywebsite.com" },
			{
				id: crypto.randomUUID(),
				label: "leetcode",
				url: "leetcode.com/meandstuff",
			},
			{ id: crypto.randomUUID(), label: "itch.io", url: "username.itch.io" },
		],
		skills: [
			{ id: crypto.randomUUID(), name: "github" },
			{ id: crypto.randomUUID(), name: "linkedin" },
			{ id: crypto.randomUUID(), name: "portfolio" },
		],
		languages: [
			{ id: crypto.randomUUID(), name: "french" },
			{ id: crypto.randomUUID(), name: "english" },
		],
	};

	await db.transaction("rw", db.workspaces, db.workspaceMeta, async () => {
		await db.workspaces.add(workspace);
		await db.workspaceMeta.add({
			id: workspace.id,
			name,
			updatedAt: now,
			createdAt: now,
		});
	});
	return workspace;
}

export async function getWorkspace(id: string): Promise<Workspace> {
	const ws = await db.workspaces.get(id);
	if (!ws) throw new Error(`Workspace "${id}" not found`);
	return ws;
}

export async function createTestProfile(profile: Profile): Promise<Profile> {
	await db.settings.put({ key: "profile", value: profile });
	const settings = await db.settings.get("profile");
	return settings?.value as Profile;
}

export async function getAllWorkspaces(): Promise<Workspace[]> {
	return db.workspaces.orderBy("updatedAt").reverse().toArray();
}
