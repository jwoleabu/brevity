export enum MessageType {
  OPTIONS_PAGE_READY = "OPTIONS_PAGE_READY",
  START_ONBOARDING = "START_ONBOARDING",
  OPEN_OPTIONS = "OPEN_OPTIONS",
  TOGGLE_UI = "TOGGLE_UI",
  CLOSE = "CLOSE",
  GET_WORKSPACES_META = "GET_WORKSPACES_META",
  GET_PROFILE = "GET_PROFILE",

  WORKSPACES_UPDATED = "WORKSPACES_UPDATED",
  PROFILE_UPDATED = "PROFILE_UPDATED",
  CONTENT_SCRIPT_MOUNTED = "CONTENT_SCRIPT_MOUNTED",
  CONTENT_SCRIPT_UNMOUNTED = "CONTENT_SCRIPT_UNMOUNTED",
}

export type Message =
  | { type: typeof MessageType.OPEN_OPTIONS }
  | { type: typeof MessageType.OPTIONS_PAGE_READY }
  | { type: typeof MessageType.START_ONBOARDING }
  | { type: typeof MessageType.TOGGLE_UI }
  | { type: typeof MessageType.CLOSE }
  | { type: typeof MessageType.GET_WORKSPACES_META }
  | { type: typeof MessageType.GET_PROFILE }
  | { type: typeof MessageType.WORKSPACES_UPDATED }
  | { type: typeof MessageType.PROFILE_UPDATED }
  | { type: typeof MessageType.CONTENT_SCRIPT_MOUNTED }
  | { type: typeof MessageType.CONTENT_SCRIPT_UNMOUNTED };
