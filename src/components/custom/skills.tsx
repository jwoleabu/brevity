import type { Language, Skill } from "@/lib/workspace";
import { ProfileSection } from "./profilesection";

type SkillProps = {
	skills: Skill[] | Language[];
	notify: () => void;
	name: string;
};

export default function Skills({ skills, notify, name }: SkillProps) {
	return (
		<ProfileSection name={name}>
			<div className="flex flex-wrap gap-2 w-full">
				{skills.map((s) => (
					<button
						type="button"
						key={s.id}
						className="flex items-center text-gray-700 gap-2 bg-muted rounded-lg py-1 px-2 text-sm transition-colors ease-in duration-75 hover:bg-indigo-100 cursor-pointer active:bg-muted"
						onClick={() => {
							notify();
							navigator.clipboard.writeText(s.name);
						}}
					>
						{s.name}
					</button>
				))}
			</div>
		</ProfileSection>
	);
}
