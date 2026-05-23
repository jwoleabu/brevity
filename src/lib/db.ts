import Dexie, { Table } from "dexie";
import {Profile, SettingRecord, Settings, Workspace, WorkspaceMeta} from "./workspace";

class BrevityDB extends Dexie{
    workspaces!: Table<Workspace, string>;
    workspaceMeta!: Table<WorkspaceMeta, string>;
    settings!: Table<SettingRecord, keyof Settings>;
    constructor(){
        super("BrevityDB");
        this.version(1).stores({
            workspaces: "id, name, createdAt, updatedAt",
            workspaceMeta: "id, updatedAt",
            settings: "key"
        });
    }
}

export const db = new BrevityDB();

export async function createNewWorkspace(name: string): Promise<Workspace> {
    const now = Date.now()
  const workspace: Workspace = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now, profileOverride: {},
    education: [],
    experience: [],
    links: []
  };

  await db.transaction("rw", db.workspaces, db.workspaceMeta, async ()=>{
    await db.workspaces.add(workspace)
    await db.workspaceMeta.add({id: workspace.id, name, updatedAt: now, createdAt: now});
  })
  return workspace;
}


export async function getWorkspace(id: string): Promise<Workspace>{
    const ws = await db.workspaces.get(id);
    if (!ws) throw new Error(`Workspace "${id}" not found`);
    return ws;
}

export async function createTestProfile(profile: Profile): Promise<Profile>{
    await db.settings.put({key: "profile", value: profile})
    const settings = await db.settings.get("profile")
    return settings!.value as Profile;
}

export async function getAllWorkspaces(): Promise<Workspace[]>{
    return db.workspaces.orderBy("updatedAt").reverse().toArray();
}