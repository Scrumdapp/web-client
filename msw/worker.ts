import {setupWorker} from "msw/browser";
import {userHandlers} from "./handlers/userHandlers.ts";

export const worker = setupWorker(
    ...userHandlers
)