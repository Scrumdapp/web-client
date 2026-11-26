import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import {
  CreateTribe,
  Tribe,
  PartialTribe,
  TribeCheckpoint,
  TribeCheckpointDates,
  TribeGroupUsers,
} from "../../../models/tribe.ts";
import { SessionDates } from "../../../models/checkpoint.ts";

function toSessionDates(it: TribeCheckpointDates): SessionDates {
  return {
    fromDate: it.from_date,
    toDate: it.to_date,
    dates: it.dates.map((date) => ({ date, sessions: [] })),
  };
}

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

export function getTribeUsers() {
  return createProcessor("getTribeUsers", (tribeId: number) => {
    return makeApiRequest<TribeGroupUsers[]>("GET", "/tribes/{id}/users", {
      params: { "{id}": tribeId.toString() },
    });
  });
}

export function getRecentTribeCheckpointDates() {
  return createProcessor(
    "getRecentTribeCheckpointDates",
    (tribeId: number, limit: number) => {
      return makeApiRequest<TribeCheckpointDates>(
        "GET",
        "/tribes/{tribeId}/sessions/dates",
        {
          params: { "{tribeId}": tribeId },
          query: { limit },
        },
      ).then(toSessionDates);
    },
  );
}

export function getTribeCheckpoints() {
  return createProcessor(
    "getTribeCheckpoints",
    (tribeId: number, date: string) => {
      return makeApiRequest<TribeCheckpoint[]>(
        "GET",
        "/tribes/{tribeId}/sessions",
        {
          params: { "{tribeId}": tribeId },
          query: { date },
        },
      );
    },
  );
}

export function getTribeCheckpointMonths() {
  return createProcessor("getTribeCheckpointMonths", (tribeId: number) => {
    return makeApiRequest<string[]>(
      "GET",
      "/tribes/{tribeId}/sessions/months",
      {
        params: { "{tribeId}": tribeId },
      },
    );
  });
}
