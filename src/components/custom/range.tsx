import type { SimpleDate } from "@/lib/workspace";

const MONTHS: Record<number, string> = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December",
};

const MONTHS_SHORT: Record<number, string> = {
	1: "Jan",
	2: "Feb",
	3: "Mar",
	4: "Apr",
	5: "May",
	6: "Jun",
	7: "Jul",
	8: "Aug",
	9: "Sep",
	10: "Oct",
	11: "Nov",
	12: "Dec",
};

type RangeProps = {
	startDate: SimpleDate;
	endDate: SimpleDate;
	contrast?: boolean;
	notify: () => void;
};

export default function DateRange({
	startDate,
	endDate,
	notify,
	contrast = false,
}: RangeProps) {
	return (
		<div className={`inline w-fit  ${contrast ? "text-gray-600" : ""}`}>
			{/** biome-ignore-start lint/a11y/useSemanticElements: a span is required to render inline text  */}
			<span
				role="button"
				tabIndex={0}
				className="cursor-pointer hover:bg-indigo-100 transition-colors duration-75 ease-in"
				onClick={() => {
					notify();
					navigator.clipboard.writeText(MONTHS[startDate.month]);
				}}
				onKeyDown={(e) => {
					if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
						e.preventDefault();
						notify();
						navigator.clipboard.writeText(MONTHS[startDate.month]);
					}
				}}
			>
				{MONTHS_SHORT[startDate.month]}
			</span>
			<span className="cursor-pointer">{` `}</span>
			<span
				role="button"
				tabIndex={0}
				className="cursor-pointer hover:bg-indigo-100 transition-colors duration-75 ease-in"
				onClick={() => {
					notify();
					navigator.clipboard.writeText(startDate.year.toString());
				}}
				onKeyDown={(e) => {
					if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
						e.preventDefault();
						notify();
						navigator.clipboard.writeText(startDate.year.toString());
					}
				}}
			>
				{startDate.year}
			</span>
			<span className="cursor-pointer">{` - `}</span>
			<span
				role="button"
				tabIndex={0}
				className="cursor-pointer hover:bg-indigo-100 transition-colors duration-75 ease-in"
				onClick={() => {
					notify();
					navigator.clipboard.writeText(MONTHS[endDate.month]);
				}}
				onKeyDown={(e) => {
					if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
						e.preventDefault();
						notify();
						navigator.clipboard.writeText(MONTHS[endDate.month]);
					}
				}}
			>
				{MONTHS_SHORT[endDate.month]}
			</span>
			<span className="cursor-pointer">{` `}</span>
			<span
				role="button"
				tabIndex={0}
				className="cursor-pointer hover:bg-indigo-100 transition-colors duration-75 ease-in"
				onClick={() => {
					notify();
					navigator.clipboard.writeText(endDate.year.toString());
				}}
				onKeyDown={(e) => {
					if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
						e.preventDefault();
						notify();
						navigator.clipboard.writeText(endDate.year.toString());
					}
				}}
			>
				{endDate.year}
			</span>
			{/** biome-ignore-end lint/a11y/useSemanticElements: a span is required to render inline text  */}
		</div>
	);
}
