import { BriefcaseBusiness, Copy, GraduationCap } from "lucide-react";
import { type Message, MessageType } from "@/lib/message";
import { cn } from "@/lib/utils";
import type { Profile, Workspace, WorkspaceMeta } from "@/lib/workspace";
import { Button } from "../ui/button";
import Block from "./block";
import Links from "./links";
import { ProfileSection } from "./profilesection";
import DateRange from "./range";

export function ProfilePage() {
	const [workspaces, setWorkspaces] = useState<WorkspaceMeta[]>([]);
	const [workspaceData, setWorkspaceData] = useState<Workspace | null>();
	const [profile, setProfile] = useState<Profile | null>(null);
	const [activeProfile, setActiveProfile] = useState<string | null>(null);

	useEffect(() => {
		const refresh = () => {
			browser.runtime
				.sendMessage({ type: MessageType.GET_WORKSPACES_META })
				.then((data: WorkspaceMeta[]) => {
					console.log("recieved", data);
					setWorkspaces(data);
					if (activeProfile === null && data.length > 0) {
						setActiveProfile(data[0].id);
					}
				})
				.catch(console.error);
		};
		refresh();

		const refreshProfile = () => {
			browser.runtime
				.sendMessage({ type: MessageType.GET_PROFILE })
				.then((data: Profile | null) => {
					console.log("recieved", data);
					setProfile(data);
				})
				.catch(console.error);
		};
		refreshProfile();

		const refreshWorkspaceData = () => {
			browser.runtime
				.sendMessage({
					type: MessageType.GET_WORKSPACE_DATA,
					workspaceId: activeProfile,
				})
				.then((data: Workspace | null) => {
					console.log("recieved", data);
					setWorkspaceData(data);
				})
				.catch(console.error);
		};

		const listener = (message: Message) => {
			console.log("profile", message);
			switch (message.type) {
				case MessageType.WORKSPACES_UPDATED:
					console.log("client workspace updated!");
					refresh();
					break;

				case MessageType.PROFILE_UPDATED:
					console.log("client profile updated!");
					refreshProfile();
					break;

				case MessageType.WORKSPACE_DATA_UPDATED:
					refreshWorkspaceData();
					console.log("workspace data updated!");
			}
		};

		browser.runtime.onMessage.addListener(listener);
		return () => {
			browser.runtime.onMessage.removeListener(listener);
		};
	}, []);

	useEffect(() => {
		if (!activeProfile) return;
		browser.runtime
			.sendMessage({
				type: MessageType.GET_WORKSPACE_DATA,
				workspaceId: activeProfile,
			})
			.then((data: Workspace | null) => {
				console.log("recieved", data);
				setWorkspaceData(data);
			})
			.catch(console.error);
	}, [activeProfile]);

	if (!workspaces) return <p>Loading...</p>;
	if (workspaces.length === 0 || profile == null)
		return <p>No profiles yet.</p>;
	if (workspaces.length === 0 || profile == null)
		return <p>No profiles yet.</p>;

	return (
		<div className="">
			<div className="flex flex-wrap gap-2 mb-5 text-sm font-extralight">
				{workspaces.map((workspace) => {
					const isActive = activeProfile === workspace.id;
					return (
						<Button
							key={workspace.id}
							size="sm"
							className={cn(
								isActive
									? ""
									: "text-gray-700 ring-1 ring-indigo-400 bg-[#E6E1FF] hover:bg-[#f3f1ff]",
								"rounded-md transition-none",
							)}
							onPointerDown={() => setActiveProfile(workspace.id)}
						>
							{workspace.name}
						</Button>
					);
				})}
			</div>
			<div className="flex flex-col gap-2 p-3 rounded-md bg-muted">
				<p className="text-sm flex gap-2 font-medium text-foreground">
					<Copy size={14} className="text-indigo-400" />
					Click any text block below to copy it!
				</p>
				<p className="text-sm text-muted-foreground">
					Use your profile to fill out your application.
				</p>
			</div>

			<div className="p-3">
				<ProfileSection name="User">
					<div className="rounded-full bg-indigo-300 aspect-square w-15 flex items-center justify-center text-center font-bold font-sans">
						<p className="text-xl">{`${profile.firstName[0].toUpperCase()}${profile.lastName[0].toUpperCase()}`}</p>
					</div>
					<div className="flex flex-col text-sm">
						<Block
							items={[
								[
									{ content: profile.firstName },
									{ content: " ", isDelimiter: true },
									{ content: profile.lastName },
								],
								[{ content: profile.email }],
								[{ content: profile.phone }],
							]}
							boldFirst={true}
						/>
					</div>
				</ProfileSection>

				<ProfileSection name="Education">
					<div className="rounded-full bg-indigo-300 aspect-square w-13 h-13 flex items-center justify-center text-center font-extrabold font-sans">
						<GraduationCap size={30}></GraduationCap>
					</div>
					<div className="flex flex-col text-sm">
						<Block
							items={[
								[
									{
										content:
											workspaceData?.education[0].schoolName ?? "no school",
									},
								],
								[
									{ content: workspaceData?.education[0].degree ?? "none" },
									{ content: ", ", isDelimiter: true },
									{
										content: workspaceData?.education[0].fieldOfStudy ?? "none",
									},
								],
							]}
							boldFirst={true}
						/>
						<DateRange
							startDate={
								workspaceData?.education[0].startDate ?? {
									month: 3,
									year: 1996,
								}
							}
							endDate={
								workspaceData?.education[0].endDate ?? { month: 3, year: 1996 }
							}
						></DateRange>
					</div>
				</ProfileSection>
				<ProfileSection name="Experience">
					<div className="rounded-full bg-indigo-300 aspect-square w-13 h-13 flex items-center justify-center text-center font-extrabold font-sans">
						<BriefcaseBusiness size={30}></BriefcaseBusiness>
					</div>
					<div className="flex flex-col text-sm">
						<Block
							items={[
								[
									{
										content:
											workspaceData?.experience[0].companyName ?? "no school",
									},
								],
								[
									{
										content: workspaceData?.experience[0].title ?? "no school",
									},
									{ content: " • ", isDelimiter: true },
									{
										content:
											workspaceData?.experience[0].location ?? "no school",
									},
								],
							]}
							boldFirst={true}
						/>
						<DateRange
							startDate={
								workspaceData?.education[0].startDate ?? {
									month: 3,
									year: 1996,
								}
							}
							endDate={
								workspaceData?.education[0].endDate ?? { month: 3, year: 1996 }
							}
						></DateRange>
					</div>
				</ProfileSection>
				<ProfileSection name="Links">
					<Links links={workspaceData?.links ?? []} />
				</ProfileSection>
			</div>
		</div>
	);
}
