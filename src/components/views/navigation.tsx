import { Pencil, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { onMessage, sendMessage } from "@/lib/message";
import type { WorkspaceMeta } from "@/lib/workspace";
import { Autofill } from "../custom/autofill";
import { ProfilePage } from "../custom/profile";

export function Navigation() {
	const [workspaces, setWorkspaces] = useState<WorkspaceMeta[]>([]);
	const [activeProfile, setActiveProfile] = useState<string | null>(null);
	const [activeProfileName, setActiveProfileName] = useState<string | null>(null);

	useEffect(() => {
		const refresh = () => {
			sendMessage("GET_WORKSPACES_META")
				.then((data) => {
					console.log(`recieved ${data}`);
					setWorkspaces(data);
					const first = data[0];
					if (activeProfile === null && first) {
						setActiveProfile(first.id);
						setActiveProfileName(first.name);
					}
				})
				.catch(console.error);
		};
		refresh();

		const removeWorkspaces = onMessage("WORKSPACES_UPDATED", () => {
			refresh();
			console.log("client workspace updated!");
		});

		return () => {
			removeWorkspaces();
		};
	}, []);

	return (
		<Tabs defaultValue="autofill" className="w-full flex flex-col">
			<div className="bg-white sticky top-0 w-f pt-4 pb-1 mb-1">
				<TabsList className="w-full h-[2.5em] text-gray-600">
					<TabsTrigger
						value="autofill"
						className="w-full flex gap-2 text-sm data-[state=active]:text-indigo-800"
					>
						<Pencil size={14} /> Autofill
					</TabsTrigger>
					<TabsTrigger
						value="profile"
						className="w-full flex gap-2 text-sm  data-[state=active]:text-indigo-800"
					>
						<User size={14} /> Profile
					</TabsTrigger>
				</TabsList>
				<div className="absolute -bottom-4 left-0 right-0 h-4 bg-linear-to-b from-white/60 to-transparent pointer-events-none" />
			</div>
			<TabsContent value="autofill">
				<Autofill savedMinutes={800} activeProfile={activeProfileName} />
			</TabsContent>
			<TabsContent value="profile">
				<ProfilePage
					activeProfile={activeProfile}
					workspaces={workspaces}
					setActiveProfile={setActiveProfile}
					setActiveProfileName={setActiveProfileName}
				/>
			</TabsContent>
		</Tabs>
	);
}
