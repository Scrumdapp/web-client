import {setupWorker} from "msw/browser";
import {userHandlers} from "./handlers/users";

export const worker = setupWorker(
    ...userHandlers
)