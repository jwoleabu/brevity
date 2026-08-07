import { defineExtensionMessaging } from "@webext-core/messaging";
import type {
	Profile,
	ResumeObject,
	Workspace,
	WorkspaceMeta,
} from "./workspace";

interface ProtocolMap {
	OPTIONS_PAGE_READY(): void;
	START_ONBOARDING(): void;
	OPEN_OPTIONS(): void;
	TOGGLE_UI(): void;
	CLOSE(): void;

	GET_WORKSPACES_META(): WorkspaceMeta[];
	GET_WORKSPACE_DATA(workspaceId: string): Workspace | null;
	GET_PROFILE(): Profile | null;

	WORKSPACES_UPDATED(): void;
	WORKSPACE_DATA_UPDATED(): void;
	PROFILE_UPDATED(): void;
	HAS_BLOB(workspaceId: string): ResumeObject | null;
	PREVIEW(id: string): void;
	CONTENT_SCRIPT_MOUNTED(): void;
	CONTENT_SCRIPT_UNMOUNTED(): void;
}

export const { sendMessage, onMessage } =
	defineExtensionMessaging<ProtocolMap>();
