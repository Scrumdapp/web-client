import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import { CreateTribe, Tribe, PartialTribe } from "../../../models/tribe.ts";
import { SessionDates } from "../../../models/checkpoint.ts";

export function getTribes() {
  return createProcessor("getTribes", () => {
    return makeApiRequest<PartialTribe[]>("GET", "/tribes");
  });
}

export function createTribe() {
  return createProcessor("createTribe", (tribe: CreateTribe) => {
    return makeApiRequest<Tribe>("POST", "/tribes", {
      body: tribe,
    });
  });
}

export function getTribe() {
  return createProcessor("getTribe", (tribeId: number) => {
    return makeApiRequest<Tribe>("GET", "/tribes/{id}", {
      params: { "{id}": tribeId.toString() },
    });
  });
}

export function getRecentTribeCheckpointDates() {
  return createProcessor(
    "getRecentTribeCheckpointDates",
    (tribeId: number, limit: number) => {
      return makeApiRequest<SessionDates>(
        "GET",
        "/tribes/{tribeId}/sessions/dates",
        {
          params: { "{tribeId}": tribeId },
          query: { limit },
        },
      );
    },
  );
}
