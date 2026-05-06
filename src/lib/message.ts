export enum MessageType {
  OPTIONS_PAGE_READY = "OPTIONS_PAGE_READY",
  START_ONBOARDING = "START_ONBOARDING",
  OPEN_OPTIONS = "OPEN_OPTIONS",
  START_PANEL = "START_PANEL",
}

export type Message =
  | { type: typeof MessageType.OPEN_OPTIONS }
  | { type: typeof MessageType.OPTIONS_PAGE_READY }
  | { type: typeof MessageType.START_ONBOARDING }
  | { type: typeof MessageType.START_ONBOARDING };
