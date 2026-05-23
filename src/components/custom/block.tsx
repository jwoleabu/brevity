
type BlockProps = {
  name: string;
};

export default function Block({ name }: BlockProps) {
  return (
    <>
      <span
        className="hover:bg-indigo-100 transition-colors duration-400 ease-in cursor-pointer"
        onClick={async () => {
          await navigator.clipboard.writeText(name);
        }}
      >
        {name}{" "}
      </span>
    </>
  );
}
