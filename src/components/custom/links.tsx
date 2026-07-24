import { Globe } from "lucide-react";
import type { JSX } from "react";
import { getDomainWithoutSuffix } from "tldts";
import GithubIcon from "@/assets/brand/github.svg?react";
import LinkedinIcon from "@/assets/brand/linkedin.svg?react";
import type { Link } from "@/lib/workspace";

type LinkProps = {
	links: Link[];
};

const domainIconMap = new Map<string, JSX.Element>([
	["github", <GithubIcon width={20} height={20} className="ml-2" />],
	["linkedin", <LinkedinIcon width={20} height={20} className="ml-2" />],
]);

function UrlToIcon(url: string): JSX.Element {
	const domain = getDomainWithoutSuffix(url);
	return (
		domainIconMap.get(domain ?? "") ?? (
			<Globe size={20} className="text-indigo-400 ml-2" />
		)
	);
}

export default function Links({ links }: LinkProps) {
	console.log("howdy", links);
	return (
		<div className="flex flex-col gap-1.5 w-full">
			{links.map((link) => (
				<button
					type="button"
					key={link.id}
					className="flex items-center gap-2 bg-muted rounded-lg p-1 text-sm transition-colors ease-in duration-75 hover:bg-indigo-100 cursor-pointer active:bg-muted"
					onClick={() => {
						navigator.clipboard.writeText(`https://${link.url.toString()}`);
					}}
				>
					{UrlToIcon(link.url)}
					<p>{link.url}</p>
				</button>
			))}
		</div>
	);
}
