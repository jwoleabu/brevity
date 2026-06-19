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
      {items.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className={`inline gap-1 cursor-pointer ${boldFirst && lineIndex === 0 ? "font-semibold" : ""}`}
        >
          {line.map(({ content, isDelimiter = false }, itemIndex) => {
            return (
              <span
                key={itemIndex}
                className={
                  !isDelimiter
                    ? "hover:bg-indigo-100 transition-colors duration-75 ease-in active:bg-muted"
                    : ""
                }
                onClick={
                  !isDelimiter
                    ? () => {
                        navigator.clipboard.writeText(
                          content.replace(/,/g, ""),
                        );
                      }
                    : undefined
                }
              >
                {content}
              </span>
            );
          })}
        </div>
      ))}
    </>
  );
}
