import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const WORKSPACE_DIR = path.resolve(
	__dirname,
	"../public/mock/workspaces",
);

export const USER_DIR = path.resolve(
	__dirname,
	"../public/mock/users",
);

export async function generateIndex(directory: string) {
	const entries = await readdir(directory, { withFileTypes: true });

	const names = entries
		.filter(
			(e) => e.isFile() && e.name.endsWith(".json") && e.name !== "index.json",
		)
		.map((e) => e.name.replace(/\.json$/, ""))
		.sort();

	await writeFile(
		path.join(directory, "index.json"),
		`${JSON.stringify(names, null, 2)}\n`,
	);

	console.log(
		`[${directory === WORKSPACE_DIR ? "workspace": "user"}-index] ${names.length} template${names.length > 1 ? "s" : ""}: ${names.join(", ") || "(none)"}`,
	);
	return names;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const directory = process.argv[2] === "-u" ? USER_DIR : WORKSPACE_DIR
	generateIndex(directory).catch((err) => {
		console.error(`[${directory === WORKSPACE_DIR ? "workspace": "user"}-index] failed:`, err);
		process.exitCode = 1;
	});
}

