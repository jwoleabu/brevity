type LineItem = {
	content: string;
	isDelimiter?: boolean;
};

type BlockProps = {
	items: LineItem[][];
	boldFirst?: boolean;
	notify: () => void;
};

export default function Block({
	items,
	boldFirst = false,
	notify,
}: BlockProps) {
	console.log(items);
	return (
		<>
			{/* biome-ignore-start lint/suspicious/noArrayIndexKey: fixed-length rows from DB, only ever replaced wholesale, never reordered/inserted */}
			{items.map((line, lineIndex) => (
				<div
					key={lineIndex}
					className={`inline gap-1 ${boldFirst && lineIndex === 0 ? "font-semibold" : ""}`}
				>
					{line.map((item, itemIndex) => {
						const { content, isDelimiter = false } = item;

						if (isDelimiter) {
							return (
								<span
									key={itemIndex}
									aria-hidden="true"
									className="cursor-pointer"
								>
									{content}
								</span>
							);
						}

						return (
							// biome-ignore lint/a11y/useSemanticElements: a span is required to render inline text
							<span
								key={itemIndex}
								role="button"
								tabIndex={0}
								className="appearance-none inline bg-transparent cursor-pointer border-0 p-0 m-0 font-inherit text-left text-inherit hover:bg-indigo-100 transition-colors duration-75 ease-in active:bg-muted"
								onClick={() => {
									notify();
									navigator.clipboard.writeText(content.replace(/,/g, ""));
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										notify();
										navigator.clipboard.writeText(content);
									}
								}}
							>
								{content}
							</span>
						);
					})}
				</div>
			))}
			{/* biome-ignore-end lint/suspicious/noArrayIndexKey: fixed-length rows from DB, only ever replaced wholesale, never reordered/inserted */}
		</>
	);
}
