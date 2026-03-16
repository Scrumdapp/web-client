import {setupWorker} from "msw/browser";
import {userHandlers} from "./handlers/userHandlers.ts";
import {groupUserHandler} from "./handlers/groupUserHandler.ts";
import {groupHandlers} from "./handlers/groupHandlers.ts";
import {groupCheckinsHandlers} from "./handlers/groupCheckinsHandlers.ts";

export const worker = setupWorker(
    ...userHandlers,
    ...groupHandlers,
    ...groupUserHandler,
    ...groupCheckinsHandlers
)