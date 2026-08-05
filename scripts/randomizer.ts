import { faker } from "@faker-js/faker";
import { generateIndex, WORKSPACE_DIR } from "./generateIndex.ts";
import { generate } from "./generateWorkspace.ts";


async function main() {
	const names = Array.from({ length: 5 }, () => faker.hacker.noun());
	await Promise.all(names.map((name) => generate(name)));
	await generateIndex(WORKSPACE_DIR);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
