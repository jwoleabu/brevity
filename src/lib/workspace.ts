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

  profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };

  education: Education[];
  experience: Experience[];
  links: Link[]

  createdAt:number;
  updatedAt:number;
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
