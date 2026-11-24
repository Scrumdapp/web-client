import { ws } from "msw";
import { WebConfig } from "../../src/config";

export const server = ws.link(WebConfig.wsEndpoint);

export const wsHandlers = [server.addEventListener("connection", (_) => {})];
