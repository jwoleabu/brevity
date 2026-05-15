import Dexie, { Table } from "dexie";
import { Workspace, WorkspaceMeta } from "./workspace";

class BrevityDB extends Dexie{
    workspaces!: Table<Workspace, string>;
    workspaceMeta!: Table<WorkspaceMeta, string>;

    constructor(){
        super("BrevityDB");
        this.version(1).stores({
            workspaces: "id, name, createdAt, updatedAt",
            workspaceMeta: "id, updatedAt",
        });
    }
}

export const db = new BrevityDB();

export async function createWorkspace(name: string): Promise<Workspace> {
    const now = Date.now()
  const workspace: Workspace = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    profile: {firstName: "Testname", lastName: "Smith",},
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

export async function createNewWorkspace(name: string): Promise<Workspace> {
    const now = Date.now()
  const workspace: Workspace = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    profile: {},
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

export async function getAllWorkspaces(): Promise<Workspace[]>{
    return db.workspaces.orderBy("updatedAt").reverse().toArray();
}