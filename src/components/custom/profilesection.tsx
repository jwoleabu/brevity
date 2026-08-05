import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProfileSectionProps = {
	children: ReactNode;
	name: string;
	className?: string;
	vertical?: boolean;
};

export function ProfileSection({
	children,
	name,
	className,
	vertical = false,
}: ProfileSectionProps) {
	return (
		<>
			<p className="text-base mt-5 mb-3 font-semibold">{name}</p>
			{vertical ? (
				<div className={cn("border-b pb-4 flex flex-col gap-5", className)}>
					{children}
				</div>
			) : (
				<div className={cn("border-b pb-4 flex gap-5", className)}>
					{children}
				</div>
			)}
		</>
	);
}
