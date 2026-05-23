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
      <p className="text-base mt-5 mb-2 font-semibold">{name}</p>
      <div className={cn("border-b pb-4 flex gap-5", className)}>{children}</div>
    </>
  );
}
