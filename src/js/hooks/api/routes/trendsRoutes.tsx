import { GroupPresenceTrends, TrendUserId, UserTrendCalendar, UserTrendMood, UserTrendPeriod, UserTrendSummary } from "../../../models/trends";
import { createProcessor, makeApiRequest } from "../apiUtils";

export function getGroupTimelineTrends() {
  return createProcessor(
    "getGroupTimelineTrends",
    (groupId: number, from?: string, to?: string) => {
      return makeApiRequest<GroupPresenceTrends>(
        "GET",
        "/trends/grouptimeline/{groupId}",
        {
          params: { "{groupId}": groupId.toString() },
          query: { ...(from ? { from } : {}), ...(to ? { to } : {}) },
          cache: { enabled: true, staleTime: 1000 * 60 * 1 },
        },
      );
    },
  );
}

export function getUserTrendSummary() {
    return createProcessor("getUserTrendSummary", (groupId: number, userId: TrendUserId) => {
        return makeApiRequest<UserTrendSummary>("GET", "/groups/{groupId}/trends/users/{userId}/summary", {
            params: { "{groupId}": groupId.toString(), "{userId}": userId.toString() },
        })
    })
}

export function getUserTrendCalendar() {
    return createProcessor("getUserTrendCalendar", (groupId: number, userId: TrendUserId, month: string) => {
        return makeApiRequest<UserTrendCalendar>("GET", "/groups/{groupId}/trends/users/{userId}/calendar", {
            params: { "{groupId}": groupId.toString(), "{userId}": userId.toString() },
            query: { month },
        })
    })
}

export function getUserTrendMood() {
    return createProcessor("getUserTrendMood", (groupId: number, userId: TrendUserId, fromDate: string, toDate: string) => {
        return makeApiRequest<UserTrendMood>("GET", "/groups/{groupId}/trends/users/{userId}/mood", {
            params: { "{groupId}": groupId.toString(), "{userId}": userId.toString() },
            query: { fromDate, toDate },
        })
    })
}

export function getUserTrendPeriod() {
    return createProcessor("getUserTrendPeriod", (groupId: number, userId: TrendUserId, fromDate: string, toDate: string) => {
        return makeApiRequest<UserTrendPeriod>("GET", "/groups/{groupId}/trends/users/{userId}/period", {
            params: { "{groupId}": groupId.toString(), "{userId}": userId.toString() },
            query: { fromDate, toDate },
        })
    })
}
