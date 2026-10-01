import { createProcessor, makeApiRequest } from "../apiUtils.ts";
import {
  GroupCheckpointSession,
  GroupCheckpointSessionCreate,
  SessionDates,
} from "../../../models/checkpoint.ts";

export interface DateRangeParams {
  start_date: string;
  end_date: string;
}

export type GetCheckpointRangeParam = { range: DateRangeParams };
export type GetCheckpointDateParam = { date: string };
export type GetCheckpointQueryOptions =
  GetCheckpointRangeParam | GetCheckpointDateParam;

export function isRangeParam(
  params: GetCheckpointQueryOptions,
): params is GetCheckpointRangeParam {
  return "range" in params;
}

export function isDateParam(
  params: GetCheckpointQueryOptions,
): params is GetCheckpointDateParam {
  return "date" in params && typeof params.date === "string";
}

export function getCheckpointSessions() {
  return createProcessor(
    "GetCheckpointSessions",
    (groupId: number, queryOptions: GetCheckpointQueryOptions) => {
      return makeApiRequest<GroupCheckpointSession[]>(
        "GET",
        "/groups/{group.id}/sessions",
        {
          params: { "{group.id}": groupId.toString() },
          query: isRangeParam(queryOptions)
            ? { ...queryOptions.range }
            : isDateParam(queryOptions)
              ? { date: queryOptions.date }
              : (() => {
                  throw new Error(
                    "expected date or range in queryOptions but got neither",
                  );
                })(),
        },
      );
    },
  );
}

export function getCheckpointSessionById() {
  return createProcessor(
    "GetCheckpointSessionById",
    (groupId: number, sessionId: number) => {
      return makeApiRequest<GroupCheckpointSession>(
        "GET",
        "/groups/{group.id}/session/{session.id}",
        {
          params: {
            "{group.id}": groupId.toString(),
            "{session.id}": sessionId.toString(),
          },
        },
      );
    },
  );
}

export function createCheckpointSessions() {
  return createProcessor(
    "createCheckpointSession",
    (groupId: number, body: GroupCheckpointSessionCreate) => {
      return makeApiRequest<GroupCheckpointSession>(
        "POST",
        "/groups/{group.id}/sessions",
        {
          body: body,
          params: { "{group.id}": groupId.toString() },
        },
      );
    },
  );
}

export function getRecentCheckpointDates() {
  return createProcessor(
    "getRecentCheckpointDates",
    (groupId: number, limit: number) => {
      return makeApiRequest<SessionDates>(
        "GET",
        "/groups/{groupId}/sessions/dates",
        {
          params: { "{groupId}": groupId },
          query: { limit },
        },
      );
    },
  );
}

export function getCheckpointDatesInMonth() {
  return createProcessor(
    "getRecentCheckpointDates",
    (groupId: number, yearMonth: string) => {
      return makeApiRequest<SessionDates>(
        "GET",
        "/groups/{groupId}/sessions/dates",
        {
          params: { "{groupId}": groupId },
          query: { month: yearMonth },
        },
      );
    },
  );
}

export function getCheckpointMonths() {
  return createProcessor("getCheckpointMonths", (groupId: number) => {
    return makeApiRequest<string[]>(
      "GET",
      "/groups/{groupId}/sessions/months",
      {
        params: { "{groupId}": groupId },
      },
    );
  });
}
