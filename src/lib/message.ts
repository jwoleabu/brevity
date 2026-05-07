export enum MessageType {
  OPTIONS_PAGE_READY = "OPTIONS_PAGE_READY",
  START_ONBOARDING = "START_ONBOARDING",
  OPEN_OPTIONS = "OPEN_OPTIONS",
  TOGGLE_UI = "TOGGLE_UI",
  CLOSE = "CLOSE",
}

export type Message =
  | { type: typeof MessageType.OPEN_OPTIONS }
  | { type: typeof MessageType.OPTIONS_PAGE_READY }
  | { type: typeof MessageType.START_ONBOARDING }
  | { type: typeof MessageType.TOGGLE_UI }
  | { type: typeof MessageType.CLOSE };
