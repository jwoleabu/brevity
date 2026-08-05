import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { faker } from "@faker-js/faker";
import type {
	Education,
	Experience,
	Language,
	Link,
	Skill,
	Workspace,
} from "@/lib/workspace";

const fieldsOfStudy = [
	"Computer Science",
	"Business Administration",
	"Psychology",
	"Biology",
	"Nursing",
	"Mechanical Engineering",
	"Electrical Engineering",
	"Economics",
	"Marketing",
	"Finance",
	"Communications",
	"Political Science",
	"English",
	"Accounting",
	"Criminal Justice",
	"Sociology",
	"Chemistry",
	"Mathematics",
	"Graphic Design",
	"Education",
	"Civil Engineering",
	"Information Technology",
	"History",
	"Kinesiology",
	"Environmental Science",
];

const degrees = ["Bachelor's", "Master's", "PhD", "Associate", "Diploma"];

type LinkType = "github" | "linkedin" | "portfolio" | "other";

const ALL_TYPES: LinkType[] = ["github", "linkedin", "portfolio", "other"];
const EXCLUSIVE_TYPES: LinkType[] = ["github", "linkedin"];

function randomLinks(): Link[] {
	const count = faker.number.int({ min: 1, max: 8 });
	const usedExclusive = new Set<LinkType>();
	const links: Link[] = [];

	for (let i = 0; i < count; i++) {
		const available = ALL_TYPES.filter(
			(type) => !EXCLUSIVE_TYPES.includes(type) || !usedExclusive.has(type),
		);
		const type = faker.helpers.arrayElement(available);

		if (EXCLUSIVE_TYPES.includes(type)) usedExclusive.add(type);

		const username = faker.internet.username();

		switch (type) {
			case "github":
				links.push({
					id: crypto.randomUUID(),
					label: "github",
					url: `github.com/${username}`,
				});
				break;
			case "linkedin":
				links.push({
					id: crypto.randomUUID(),
					label: "linkedin",
					url: `linkedin.com/in/${username}`,
				});
				break;
			case "portfolio":
				links.push({
					id: crypto.randomUUID(),
					label: "portfolio",
					url: faker.internet.domainName(),
				});
				break;
			case "other":
				links.push({
					id: crypto.randomUUID(),
					label: faker.internet.domainWord(),
					url: faker.internet.domainName(),
				});
				break;
		}
	}

	return links;
}

function skills(): Skill[] {
	const count = faker.number.int({ min: 1, max: 8 });
	const skills: Skill[] = [];

	for (let i = 0; i < count; i++) {
		skills.push({ id: crypto.randomUUID(), name: faker.hacker.noun() });
	}

	return skills;
}

function languages(): Language[] {
	const allLanguages = [
		"English",
		"French",
		"Swedish",
		"Spanish",
		"Japanese",
		"Italian",
		"Yoruba",
	];
	const count = faker.number.int({ min: 1, max: 3 });

	const selected = faker.helpers.arrayElements(allLanguages, count);

	return selected.map((name) => ({ id: crypto.randomUUID(), name }));
}

interface MonthYear {
	month: number;
	year: number;
}

export async function generateMockWorkspace(name: string): Promise<Workspace> {
	const now = Date.now();

	const workspace: Workspace = {
		id: crypto.randomUUID(),
		name,
		createdAt: now,
		updatedAt: now,
		profileOverride: {},
		education: education(),
		experience: experience(),
		links: randomLinks(),
		skills: skills(),
		languages: languages(),
	};

	return workspace;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, "..", "public", "mock", "workspaces");

export async function generate(name: string) {
	const workspace = await generateMockWorkspace(name);

	mkdirSync(OUTPUT_DIR, { recursive: true });
	const outputPath = join(OUTPUT_DIR, `${name}.json`);
	writeFileSync(outputPath, JSON.stringify(workspace, null, 2), "utf-8");
	console.log(`Wrote ${outputPath} (id: ${workspace.id}, name: ${name})`);
}

function addMonths(base: Date, months: number): Date {
	const d = new Date(base);
	d.setMonth(d.getMonth() + months);
	return d;
}

function toMonthYear(date: Date): MonthYear {
	return { month: date.getMonth() + 1, year: date.getFullYear() };
}

function experience(): Experience[] {
	const count = faker.number.int({ min: 1, max: 5 });

	const hasCurrentRole = faker.datatype.boolean({ probability: 0.7 });

	const roles: Experience[] = [];

	let cursor = faker.date.recent({ days: { min: 10, max: 100 } });
	const country = faker.location.country();

	for (let index = 0; index < count; index++) {
		const isCurrent = index === 0 && hasCurrentRole;
		const end = isCurrent ? new Date() : cursor;
		const durationMonths = faker.number.int({ min: 3, max: 36 });
		const start = addMonths(end, -durationMonths);

		roles.push({
			id: crypto.randomUUID(),
			companyName: faker.company.name(),
			title: faker.person.jobTitle(),
			employmentType: faker.helpers.arrayElement([
				"Full-time",
				"Part-time",
				"Contract",
				"Internship",
			]),
			location: `${faker.location.city()}, ${country}`,
			startDate: toMonthYear(start),
			endDate: toMonthYear(end),
			isCurrent,
			description: faker.lorem.paragraph({ min: 2, max: 6 }),
		});

		const gapMonths = faker.number.int({ min: 0, max: 3 });
		cursor = addMonths(start, -gapMonths);
	}

	return roles;
}

function education(): Education[] {
	const count = faker.number.int({ min: 1, max: 2 });
	let end = new Date().getFullYear() - faker.number.int({ min: 0, max: 3 });
	let start = end - faker.number.int({ min: 1, max: 4 });

	const edu: Education[] = [];

	for (let index = 0; index < count; index++) {
		edu.push({
			id: crypto.randomUUID(),
			schoolName: `University of ${faker.location.city()}`,
			degree: faker.helpers.arrayElement(degrees),
			fieldOfStudy: faker.helpers.arrayElement(fieldsOfStudy),
			startDate: { month: faker.number.int({ min: 1, max: 12 }), year: start },
			endDate: { month: faker.number.int({ min: 1, max: 12 }), year: end },
		});

		end = start - faker.number.int({ min: 0, max: 1 });
		start = end - faker.number.int({ min: 1, max: 4 });
	}

	return edu;
}
