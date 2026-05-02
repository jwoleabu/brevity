import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ProfileSectionProps = {
  children: ReactNode;
  name: string;
  className?: string;
};

export function ProfileSection({
  children,
  name,
  className,
}: ProfileSectionProps) {
  return (
    <>
      <p className="text-base mt-5 mb-1">{name}</p>
      <div className={cn("border-b pb-4", className)}>{children}</div>
    </>
  );
}
