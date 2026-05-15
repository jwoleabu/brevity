import { Copy } from "lucide-react";
import { ProfileSection } from "./profilesection";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { WorkspaceMeta } from "@/lib/workspace";
import { MessageType, Message } from "@/lib/message";
import Block from "./block";

export function Profile() {
  const [workspaces, setWorkspaces] = useState<WorkspaceMeta[]>([]);
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

    const listener = (message: Message) => {
      console.log("profile", message);
      if (message.type === MessageType.WORKSPACES_UPDATED) {
        console.log("client workspace updated!");
        refresh();
      }
    };

    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);

  if (!workspaces) return <p>Loading...</p>;
  if (workspaces.length === 0) return <p>No profiles yet.</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5 text-sm font-extralight">
        {workspaces.map((workspace) => {
          const isActive = activeProfile === workspace.id;
          return (
            <Button
              key={workspace.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                isActive
                  ? ""
                  : "text-gray-700 ring-1 ring-black bg-[#E6E1FF] hover:bg-[#f3f1ff]",
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

      <ProfileSection name="Myname">
        <Block name="Walter White"></Block>
        <Block name="Walter White"></Block>
      </ProfileSection>
      <ProfileSection name="Education">
        <p>Sampletext</p>
      </ProfileSection>
      <ProfileSection name="Experience">
        <p>Sampletext</p>
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
  );
}
