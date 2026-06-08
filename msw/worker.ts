import { setupWorker } from "msw/browser";
import { userHandlers } from "./handlers/userHandlers.ts";
import { groupUserHandler } from "./handlers/groupUserHandler.ts";
import { groupHandlers } from "./handlers/groupHandlers.ts";
import { groupCheckinsHandlers } from "./handlers/groupCheckinsHandlers.ts";
import { groupCheckpointHandlers } from "./handlers/groupCheckpointHandlers.ts";
import { userCookieHandler } from "./handlers/userCookieHandler.ts";
import { inviteHandlers } from "./handlers/inviteHandlers.ts";
import { trendsHandlers } from "./handlers/trendsHandlers.ts";

export const worker = setupWorker(
    ...userHandlers,
    ...groupHandlers,
    ...groupUserHandler,
    ...groupCheckinsHandlers,
    ...groupCheckpointHandlers,
    ...userCookieHandler,
    ...inviteHandlers,
    ...trendsHandlers
)
