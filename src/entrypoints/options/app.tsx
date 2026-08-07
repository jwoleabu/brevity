import { useEffect, useState } from "react";
import { BugReportForm } from "@/components/custom/error";
import { TemplateSelect } from "@/components/custom/templateselect";
import { Button } from "@/components/ui/button";
import {
	createMockUser,
	createMockWorkspace,
	createNewWorkspace,
	db,
} from "@/lib/db";
import { onMessage, sendMessage } from "@/lib/message";

function App() {
	const [workspaceName, setWorkspaceName] = useState("");
	const [mockWorkspaceName, setMockWorkspaceName] = useState("");

	const [mockUserName, setMockUserName] = useState("");

	const [text, setText] = useState<string>("options");

	useEffect(() => {
		sendMessage("OPTIONS_PAGE_READY");

		const removeOnboarding = onMessage("START_ONBOARDING", () => {
			setText("onboarding!");
		});

		return () => removeOnboarding();
	}, []);

	return (
		<div className="flex flex-col">
			<p className="text-9xl">{text}</p>
			<input
				className="border border-black text-2xl px-4 py-4"
				name="input"
				value={workspaceName}
				onChange={(e) => {
					setWorkspaceName(e.target.value);
				}}
			></input>

			<Button
				onClick={async () => {
					if (!workspaceName.trim()) return;
					try {
						await createNewWorkspace(workspaceName.trim());
						sendMessage("WORKSPACES_UPDATED");
						console.log("sending workspace updated");
					} catch (err) {
						console.error(err);
					}
				}}
			>
				Add devops to database
			</Button>

			<TemplateSelect
				value={mockWorkspaceName}
				template="workspaces"
				onChange={setMockWorkspaceName}
			/>
			<Button
				onClick={async () => {
					if (!mockWorkspaceName.trim()) return;
					try {
						await createMockWorkspace(mockWorkspaceName);
						sendMessage("WORKSPACES_UPDATED");
					} catch (err) {
						console.error(err);
					}
				}}
			>
				Add Mock Workspace
			</Button>

			<TemplateSelect
				value={mockUserName}
				template="users"
				onChange={setMockUserName}
			/>
			<Button
				onClick={async () => {
					if (!mockUserName.trim()) return;
					try {
						await createMockUser(mockUserName);
						sendMessage("PROFILE_UPDATED");
					} catch (err) {
						console.error(err);
					}
				}}
			>
				Add Mock User
			</Button>

			<PdfUploader />
			<button
				type="button"
				onClick={() => openPdf("dad87589-db83-4135-a06f-db9aa89f9b8c")}
			>
				Open PDF
			</button>

			<form></form>
			<Button onClick={async () => {}}>Create actual workspace</Button>
			<BugReportForm></BugReportForm>
		</div>
	);

	function PdfUploader() {
		async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
			const file = e.target.files?.[0];

			if (file?.type !== "application/pdf") return;
			const now = Date.now();
			await db.uploads.add({
				id: crypto.randomUUID(),
				name: file.name,
				createdAt: now,
				updatedAt: now,
				blob: file,
			});
		}
		return (
			<input type="file" accept="application/pdf" onChange={handleChange} />
		);
	}
}

export default App;

async function openPdf(uploadId: string) {
	const record = await db.uploads.get(uploadId);
	if (!record) return;

	const url = URL.createObjectURL(record.blob);
	window.open(url, "_blank");

	setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
