import { EventChannel } from "./eventChannel";

export namespace EventBus {
  export const on401Detected = new EventChannel<void>();
}
