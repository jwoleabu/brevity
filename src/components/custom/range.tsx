import { SimpleDate } from "@/lib/workspace";

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
};

export default function DateRange({ startDate, endDate }: RangeProps) {
  return (
    <div className="inline w-fit cursor-pointer">
      {/* <span>
        {`${MONTHS_SHORT[startDate.month]} ${startDate.year} - ${MONTHS_SHORT[endDate.month]} ${endDate.year}`}
      </span> */}
      <span
        className="hover:bg-indigo-100 transition-colors duration-75 ease-in"
        onClick={() => {
          navigator.clipboard.writeText(MONTHS[startDate.month]);
        }}
      >
        {MONTHS_SHORT[startDate.month]}
      </span>
      <span>{` `}</span>
      <span
        className="hover:bg-indigo-100 transition-colors duration-75 ease-in"
        onClick={() => {
          navigator.clipboard.writeText(startDate.year.toString());
        }}
      >
        {startDate.year}
      </span>
      <span>{` - `}</span>
      <span
        className="hover:bg-indigo-100 transition-colors duration-75 ease-in"
        onClick={() => {
          navigator.clipboard.writeText(MONTHS[endDate.month]);
        }}
      >
        {MONTHS_SHORT[endDate.month]}
      </span>
      <span>{` `}</span>
      <span
        className="hover:bg-indigo-100 transition-colors duration-75 ease-in"
        onClick={() => {
          navigator.clipboard.writeText(endDate.year.toString());
        }}
      >
        {endDate.year}
      </span>
    </div>
  );
}
