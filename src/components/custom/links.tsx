import { Link } from "@/lib/workspace";
import { Globe } from "lucide-react";

type LinkProps = {
  links: Link[];
};

export default function Links({ links }: LinkProps) {
  console.log("howdy", links);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {links.map((link) => (
        <div key={link.id} className="flex items-center gap-1.5 bg-muted rounded-lg p-1 text-sm transition-colors ease-in duration-75 hover:bg-indigo-100 cursor-pointer active:bg-muted">
            <Globe size={14} className="text-indigo-400 ml-1.5"/>
            <p>{link.url}</p>
        </div>
      ))}
    </div>
  );
}