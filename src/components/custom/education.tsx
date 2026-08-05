import { GraduationCap } from "lucide-react";
import type { Education } from "@/lib/workspace";
import Block from "./block";
import { ProfileSection } from "./profilesection";
import DateRange from "./range";

type ExperienceProps = {
	edu: Education[];
	notify: () => void;
};

export default function ProfileEducation({ edu, notify }: ExperienceProps) {
	return (
		<ProfileSection name="Education" vertical={true}>
			{edu.map((e) => (
				<div key={e.id} className="flex gap-5">
					<div className="rounded-full bg-indigo-300 aspect-square w-11 h-11 flex items-center justify-center text-center font-extrabold font-sans">
						<GraduationCap size={28} />
					</div>
					<div className="flex flex-col text-sm">
						<Block
							items={[
								[
									{
										content: e.schoolName,
									},
								],
								[
									{ content: e.degree },
									{ content: ", ", isDelimiter: true },
									{
										content: e.fieldOfStudy,
									},
								],
							]}
							boldFirst={true}
							notify={notify}
							contrast={true}
						/>
						<DateRange
							startDate={e.startDate}
							endDate={e.endDate}
							notify={notify}
							contrast={true}
						></DateRange>
					</div>
				</div>
			))}
		</ProfileSection>
	);
}
