export interface WorkspaceMeta {
	id: string;
	name: string;
	updatedAt: number;
	createdAt: number;
}

export interface Workspace {
	id: string;
	name: string;
	resume?: string;

	profileOverride?: Partial<Profile>;

	education: Education[];
	experience: Experience[];
	links: Link[];
	skills: Skill[];
	languages: Language[];
	createdAt: number;
	updatedAt: number;
}

export interface Settings {
	profile: Profile;
}

export interface Profile {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface Education {
	id: string;
	schoolName: string;
	degree: string;
	fieldOfStudy: string;
	startDate: SimpleDate;
	endDate: SimpleDate;
}

export type SimpleDate = {
	day?: number;
	month: number;
	year: number;
};

export interface Experience {
	id: string;
	companyName: string;
	title: string;
	employmentType: string;
	location: string;
	startDate: SimpleDate;
	endDate: SimpleDate;
	isCurrent: boolean;
	description?: string;
}

export interface Link {
	id: string;
	label: string;
	url: string;
}

export interface Skill {
	id: string;
	name: string;
}

export interface Language {
	id: string;
	name: string;
}

export type SettingRecord = {
	[K in keyof Settings]: {
		key: K;
		value: Settings[K];
	};
}[keyof Settings];

export interface Upload {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
	blob: Blob;
}

export type ResumeObject = {
	id: string;
	uploadedAt: number;
};
