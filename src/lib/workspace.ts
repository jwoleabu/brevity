import { Dexie } from "dexie";

export interface WorkspaceMeta{
  id: string,
  name: string,
  updatedAt: number;
  createdAt: number;
}

export interface Workspace {
  id: string;
  name: string;

  profileOverride?: Partial<Profile>

  education: Education[];
  experience: Experience[];
  links: Link[]

  createdAt:number;
  updatedAt:number;
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

interface Education {
  id: string;
  schoolName: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
}

interface Experience {
  id: string;
  companyName: string;
  title: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface Link {
  id: string;
  label: string;
  url: string;
}

export type SettingRecord = {
  [K in keyof Settings]: {
    key: K;
    value: Settings[K];
  }
}[keyof Settings];