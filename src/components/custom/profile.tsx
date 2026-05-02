import { Copy } from "lucide-react";
import { ProfileSection } from "./profilesection";

export function Profile() {
  return (
    <div>
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
    </div>
  );
}
