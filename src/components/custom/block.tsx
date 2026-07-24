type LineItem = {
	content: string;
	isDelimiter?: boolean;
};

type BlockProps = {
	items: LineItem[][];
	boldFirst?: boolean;
};

export default function Block({ items, boldFirst = false }: BlockProps) {
	console.log(items);
	return (
		<>
			{/* biome-ignore-start lint/suspicious/noArrayIndexKey: fixed-length rows from DB, only ever replaced wholesale, never reordered/inserted */}
			{items.map((line, lineIndex) => (
				<div
					key={lineIndex}
					className={`inline gap-1 cursor-pointer ${boldFirst && lineIndex === 0 ? "font-semibold" : ""}`}
				>
					{line.map((item, itemIndex) => {
						const { content, isDelimiter = false } = item;

						if (isDelimiter) {
							return (
								<span key={itemIndex} aria-hidden="true">
									{content}
								</span>
							);
						}

						return (
							<button
								key={itemIndex}
								type="button"
								className="appearance-none bg-transparent cursor-pointer border-0 p-0 m-0 font-inherit text-inherit hover:bg-indigo-100 transition-colors duration-75 ease-in active:bg-muted"
								onClick={() => {
									navigator.clipboard.writeText(content.replace(/,/g, ""));
								}}
							>
								{content}
							</button>
						);
					})}
				</div>
			))}
			{/* biome-ignore-end lint/suspicious/noArrayIndexKey: fixed-length rows from DB, only ever replaced wholesale, never reordered/inserted */}
		</>
	);
}
