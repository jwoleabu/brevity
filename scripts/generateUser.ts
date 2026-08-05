import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { faker } from "@faker-js/faker";
import type { Profile } from "@/lib/workspace";

export function generateMockProfile(): Profile {
	const profile: Profile = {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
	};
	return profile;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, "..", "public", "mock", "users");

export function generateUser() {
	const user = generateMockProfile();

	mkdirSync(OUTPUT_DIR, { recursive: true });
	const outputPath = join(OUTPUT_DIR, `${user.firstName}${user.lastName}.json`);
	writeFileSync(outputPath, JSON.stringify(user, null, 2), "utf-8");
	console.log(`Wrote ${outputPath} (name: ${user.firstName}${user.lastName})`);
}

function main() {
	generateUser()
}

main()
