import { BriefcaseBusiness } from "lucide-react";
import type { Experience } from "@/lib/workspace";
import Block from "./block";
import { ProfileSection } from "./profilesection";
import DateRange from "./range";

type ExperienceProps = {
	exp: Experience[];
	notify: () => void;
};

export default function ProfileExperience({ exp, notify }: ExperienceProps) {
	return (
		<ProfileSection name="Experience" vertical={true}>
			{exp.map((e) => (
				<div key={e.id} className="flex gap-5">
					<div className="rounded-full bg-linear-to-b from-indigo-300 to-indigo-500 aspect-square w-11 h-11 flex items-center justify-center text-center font-extrabold font-sans">
						<BriefcaseBusiness size={26} color="#fff" />
					</div>
					<div className="flex flex-col text-sm">
						<Block
							items={[
								[
									{
										content: e.title,
									},
								],
								[
									{
										content: e.companyName,
									},
									{ content: " • ", isDelimiter: true },
									{
										content: e.location,
									},
								],
							]}
							boldFirst={true}
							contrast={true}
							notify={notify}
						/>
						<DateRange
							startDate={e.startDate}
							endDate={e.endDate}
							notify={notify}
							contrast={true}
						></DateRange>
						{e.description ? (
							<button
								className={`appearance-none inline bg-transparent cursor-pointer border-0 p-0 m-0 font-inherit text-left hover:bg-indigo-100 transition-colors duration-75 ease-in active:bg-muted`}
								type="button"
								onClick={() => {
									notify();
									navigator.clipboard.writeText(e.description ?? "");
								}}
							>
								{e.description}
							</button>
						) : null}
					</div>
				</div>
			))}
		</ProfileSection>
	);
}
