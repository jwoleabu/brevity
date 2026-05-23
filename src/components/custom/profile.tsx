import { BriefcaseBusiness, Copy, CopyIcon, GraduationCap } from "lucide-react";
import { ProfileSection } from "./profilesection";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { WorkspaceMeta, Profile } from "@/lib/workspace";
import { MessageType, Message } from "@/lib/message";
import Block from "./block";

export function Profile() {
  const [workspaces, setWorkspaces] = useState<WorkspaceMeta[]>([]);
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
      }
    };

    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);
  if (!workspaces) return <p>Loading...</p>;
  if (workspaces.length === 0 || profile == null)
    return <p>No profiles yet.</p>;

  return (
    <div>
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
                "rounded-3xl transition-none",
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
          <Copy size={14} />
          Click any text block below to copy it!
        </p>
        <p className="text-sm text-muted-foreground">
          Use your profile to fill out your application.
        </p>
      </div>
      <div
        className={`
          absolute flex bottom-4 gap-2 left-1/2 -translate-x-1/2 justify-center items-center
          bg-gray-900 text-white text-sm px-3 py-1.5 rounded-2xl
          transition-colors duration-300
        `}
      >
        <CopyIcon width={14} /> Copied text!
      </div>

      <div className="p-3">
        <ProfileSection name="User">
          <div className="rounded-full bg-indigo-300 aspect-square w-15 flex items-center justify-center text-center font-extrabold font-sans">
            <p>{`${profile.firstName[0].toUpperCase()}${profile.lastName[0].toUpperCase()}`}</p>
          </div>
          <div className="flex flex-col text-sm">
            <Block name={`${profile.firstName} ${profile.lastName}`}></Block>
            <Block name={profile.email}></Block>
            <Block name={profile.phone}></Block>
          </div>
        </ProfileSection>
        <ProfileSection name="Education">
          <div className="rounded-full bg-indigo-300 aspect-square w-13 h-13 flex items-center justify-center text-center font-extrabold font-sans">
            <GraduationCap size={30}></GraduationCap>
          </div>
          <div className="flex flex-col text-sm">
            <Block name="Walter White"></Block>
            <Block name="Walter White"></Block>
            <Block name="Walter White"></Block>
          </div>
        </ProfileSection>
        <ProfileSection name="Experience">
          <div className="rounded-full bg-indigo-300 aspect-square w-13 h-13 flex items-center justify-center text-center font-extrabold font-sans">
            <BriefcaseBusiness size={30}></BriefcaseBusiness>
          </div>
          <div className="flex flex-col text-sm">
            <Block name="Walter White"></Block>
            <Block name="Walter White"></Block>
            <Block name="Walter White"></Block>
          </div>
        </ProfileSection>
        <ProfileSection name="Links">
          <p>Sampletext</p>
        </ProfileSection>
        <ProfileSection name="Skills">
          <p>Sampletext</p>
        </ProfileSection>
        <ProfileSection name="Links">
          <p>Sampletext</p>
        </ProfileSection>
        <ProfileSection name="Links">
          <p>Sampletext</p>
        </ProfileSection>
        <ProfileSection name="Links">
          <p>Sampletext</p>
        </ProfileSection>
        <ProfileSection name="Links">
          <p>Sampletext</p>
        </ProfileSection>
      </div>
    </div>
  );
}
