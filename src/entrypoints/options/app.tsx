import { useEffect, useState } from "react";
import { BugReportForm } from "@/components/custom/error";
import { Button } from "@/components/ui/button";
import { createNewWorkspace } from "@/lib/db";
import { type Message, MessageType } from "@/lib/message";

function App() {
	const [workspaceName, setWorkspaceName] = useState("");
	const [text, setText] = useState<string>("options");

	useEffect(() => {
		browser.runtime.sendMessage({ type: MessageType.OPTIONS_PAGE_READY });

		const listener = (message: Message) => {
			if (message.type === MessageType.START_ONBOARDING) {
				setText("onboarding!");
			}
		};
		browser.runtime.onMessage.addListener(listener);
		return () => browser.runtime.onMessage.removeListener(listener);
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
						await browser.runtime.sendMessage({
							type: MessageType.WORKSPACES_UPDATED,
						});
						console.log("sending workspace updated");
					} catch (err) {
						console.error(err);
					}
				}}
			>
				Add devops to database
			</Button>

			<form></form>
			<Button onClick={async () => {}}>Create actual workspace</Button>
			<BugReportForm></BugReportForm>
		</div>
	);
}

export default App;
