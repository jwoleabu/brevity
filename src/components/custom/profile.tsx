import { Copy, Eye, FileText } from "lucide-react";
import { onMessage, sendMessage } from "@/lib/message";
import { cn } from "@/lib/utils";
import type {
	Profile,
	ResumeObject,
	Workspace,
	WorkspaceMeta,
} from "@/lib/workspace";
import Block from "./block";
import ProfileEducation from "./education";
import ProfileExperience from "./experience";
import Links from "./links";
import { ProfileSection } from "./profilesection";
import Skills from "./skills";

export function ProfilePage() {
	const [visible, setVisible] = useState(false);
	const [leaving, setLeaving] = useState(false);
	const [instant, setInstant] = useState(false);
	const hideTimer = useRef<NodeJS.Timeout | null>(null);
	const unmountTimer = useRef<NodeJS.Timeout | null>(null);
	const [workspaces, setWorkspaces] = useState<WorkspaceMeta[]>([]);
	const [workspaceData, setWorkspaceData] = useState<Workspace | null>();
	const [profile, setProfile] = useState<Profile | null>(null);
	const [activeProfile, setActiveProfile] = useState<string | null>(null);
	const [resume, setResume] = useState<ResumeObject | null>(null);

	function copynotify() {
		if (hideTimer?.current) clearTimeout(hideTimer.current);
		if (unmountTimer?.current) clearTimeout(unmountTimer.current);
		setVisible(true);

		if (leaving) {
			setInstant(true);
			setLeaving(false);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setInstant(false));
			});
		} else {
			setLeaving(false);
		}

		hideTimer.current = setTimeout(() => {
			setLeaving(true);
			unmountTimer.current = setTimeout(() => setVisible(false), 500);
		}, 1000);
	}

	useEffect(() => {
		const refresh = () => {
			sendMessage("GET_WORKSPACES_META")
				.then((data) => {
					console.log(`recieved ${data}`);
					setWorkspaces(data);
					const first = data[0];
					if (activeProfile === null && first) {
						setActiveProfile(first.id);
					}
				})
				.catch(console.error);
		};
		refresh();

		const refreshProfile = () => {
			sendMessage("GET_PROFILE")
				.then((data) => {
					console.log(`recieved ${data}`);
					setProfile(data);
				})
				.catch(console.error);
		};
		refreshProfile();

		const refreshWorkspaceData = () => {
			if (!activeProfile) return;
			sendMessage("GET_WORKSPACE_DATA", activeProfile)
				.then((data) => {
					console.log(`recieved ${data}`);
					setWorkspaceData(data);
				})
				.catch(console.error);
		};

		const removeWorkspaces = onMessage("WORKSPACES_UPDATED", () => {
			refresh();
			console.log("client workspace updated!");
		});

		const removeProfile = onMessage("PROFILE_UPDATED", () => {
			refreshProfile();
			console.log("client profile updated!");
		});

		const removeWorkspaceData = onMessage("WORKSPACE_DATA_UPDATED", () => {
			refreshWorkspaceData();
			console.log("workspace data updated!");
		});

		return () => {
			removeWorkspaces();
			removeProfile();
			removeWorkspaceData();
		};
	}, []);

	useEffect(() => {
		if (!activeProfile) return;
		sendMessage("GET_WORKSPACE_DATA", activeProfile)
			.then((data) => {
				console.log(`recieved ${data}`);
				setWorkspaceData(data);
			})
			.catch(console.error);
	}, [activeProfile]);

	useEffect(() => {
		if (
			workspaceData?.resume === undefined ||
			workspaceData.resume.trim() === ""
		) {
			setResume(null);
			return;
		}
		const id = workspaceData.resume;
		sendMessage("HAS_BLOB", id)
			.then((data) => {
				setResume(data);
				console.log("file exists?", data);
			})
			.catch(console.error);
	}, [workspaceData]);

	if (!workspaces) return <p>Loading...</p>;
	if (profile === null) return <p>No profiles yet.</p>;
	if (workspaces.length === 0) return <p>No workspaces yet.</p>;

	return (
		<div className="">
			<div className="flex flex-wrap gap-2 mb-5 text-sm font-extralight">
				{workspaces.map((workspace) => {
					const isActive = activeProfile === workspace.id;
					return (
						<button
							type="button"
							key={workspace.id}
							className={cn(
								isActive
									? "text-white [border-width:thin] border-black bg-black"
									: "text-gray-700 [border-width:thin] border-indigo-400 bg-[#E6E1FF] hover:bg-[#f3f1ff]",
								"text-sm font-semibold appearance-none rounded-md transition-none py-1 px-2",
							)}
							onPointerDown={() => setActiveProfile(workspace.id)}
							onKeyDown={(e) => {
								if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
									e.preventDefault();
									setActiveProfile(workspace.id);
								}
							}}
						>
							{workspace.name}
						</button>
					);
				})}
			</div>
			<div className="flex flex-col gap-2 p-3 rounded-md bg-muted">
				<p className="text-sm flex gap-2 font-medium text-foreground">
					<Copy size={14} className="text-indigo-400" />
					Click any text block below to copy it!
				</p>
				<p className="text-sm text-gray-600">
					Use your profile to fill out your application.
				</p>
			</div>

			<div className="p-3">
				<ProfileSection name="User">
					<div className="rounded-full bg-indigo-300 aspect-square w-11 h-11 flex items-center justify-center text-center font-bold font-sans">
						<p className="text-xl">{`${profile.firstName.charAt(0).toUpperCase()}${profile.lastName.charAt(0).toUpperCase()}`}</p>
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
							notify={copynotify}
						/>
					</div>
				</ProfileSection>
				{workspaceData?.education?.length ? (
					<ProfileEducation edu={workspaceData.education} notify={copynotify} />
				) : null}

				{workspaceData?.experience?.length ? (
					<ProfileExperience
						exp={workspaceData.experience}
						notify={copynotify}
					/>
				) : null}

				{resume ? (
					<ProfileSection name="Uploads">
						<div className="rounded-full bg-indigo-300 aspect-square w-11 h-11 flex items-center justify-center text-center font-extrabold font-sans">
							<FileText size={28} />
						</div>
						<div className="flex flex-col text-sm">
							<p className="font-semibold">Resume</p>
							<p className="text-gray-600">
								Uploaded:{" "}
								{new Date(resume.uploadedAt).toLocaleString(undefined, {
									year: "numeric",
									month: "numeric",
									day: "numeric",
									hour: "numeric",
									minute: "2-digit",
									second: "2-digit",
								})}
							</p>{" "}
							<button
								onClick={() => preview(resume.id)}
								type="button"
								className="flex items-center gap-1 text-indigo-800 w-fit hover:cursor-pointer"
							>
								<Eye size={14} />
								<p>Preview</p>
							</button>
						</div>
					</ProfileSection>
				) : null}

				<ProfileSection name="Links">
					<Links links={workspaceData?.links ?? []} notify={copynotify} />
				</ProfileSection>

				{workspaceData?.skills?.length ? (
					<Skills
						name="Skills"
						skills={workspaceData.skills}
						notify={copynotify}
					/>
				) : null}

				{workspaceData?.languages?.length ? (
					<Skills
						name="Languages"
						skills={workspaceData.languages}
						notify={copynotify}
					/>
				) : null}
			</div>
			{visible && <Popup leaving={leaving} instant={instant} />}
		</div>
	);
}

function Popup({ leaving, instant }: { leaving: boolean; instant: boolean }) {
	return (
		<div
			className={`absolute flex bottom-3 items-center gap-2 left-1/2 -translate-x-1/2 rounded-2xl px-2 py-1 bg-indigo-300 pointer-events-none
        ${instant ? "" : "[transition:opacity_0.5s,translate_0.5s]"} ease-in
        ${leaving ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
		>
			<Copy size={14} />
			<span className="text-sm">Copied to clipboard!</span>
		</div>
	);
}

export function preview(id: string) {
	sendMessage("PREVIEW", id);
}
