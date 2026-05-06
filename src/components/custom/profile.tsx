import { Copy } from "lucide-react";
import { ProfileSection } from "./profilesection";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function Profile() {
  const [profiles, setProfiles] = useState([
    { id: 0, name: "Default" },
    { id: 1, name: "Backend" },
    { id: 2, name: "Frontend" },
  ]);

  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5 text-sm font-extralight">
        {profiles.map((profile) => (
          <Button
            key={profile.id}
            variant={activeProfile === profile.id ? "default" : "outline"}
            size="sm"
            className={cn(
              activeProfile === profile.id
                ? ""
                : "text-gray-700 ring-1 ring-black bg-[#E6E1FF] hover:bg-[#f3f1ff]",
              "rounded-3xl transition-none",
            )}
            onPointerDown={() => setActiveProfile(profile.id)}
          >
            {profile.name}
          </Button>
        ))}
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
        <p>Sampletext</p>
        <p>Sampletext</p>
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
