import { http, HttpResponse } from "msw";
import {
  SessionStatus,
  TribeCheckpoint,
  TribeCheckpointDates,
  TribeGroupCheckpoint,
} from "../../src/js/models/tribe";
import { tribeData } from "./tribeHandler";
import { groupCheckpoints } from "./groupCheckpointHandlers";
import { groupUserData } from "./groupUserHandler";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../src/js/utils/scrumdappDate";
import {
  firstDayOfMonth,
  getWeekEnd,
  getWeekStart,
  getYearMonth,
  lastDayOfMonth,
  parseYearMonth,
} from "../../src/js/utils/timeUtils";

const TRIBE_NOT_FOUND = {
  status: 404,
  code: "TRIBE_NOT_FOUND",
  titleTranslationKey: "errors.tribe.notFound.title",
  descriptionTranslationKey: "errors.tribe.notFound.description",
};

function getTribeSessions(tid: string) {
  const tribe = tribeData.find((it) => it.id == parseInt(tid));
  if (!tribe) return null;

  const groupIds = tribe.groups.map((it) => it.id);
  return {
    groupIds,
    sessions: groupCheckpoints.filter((it) =>
      groupIds.includes(it.sessions.groupId),
    ),
  };
}

export const tribeCheckpointHandlers = [
  http.get("/api/tribes/:tid/sessions", ({ params, request }) => {
    const data = getTribeSessions(params.tid as string);
    if (!data) return HttpResponse.json(TRIBE_NOT_FOUND, { status: 404 });

    const date = new URL(request.url).searchParams.get("date");
    if (!date) return HttpResponse.json({ status: 400 }, { status: 400 });

    const onDate = data.sessions.filter(
      (it) => toScrumdappDate(new Date(it.sessions.startTime)) == date,
    );
    const names = [...new Set(onDate.map((it) => it.sessions.name))].sort();

    const result: TribeCheckpoint[] = names.map((name) => ({
      session_name: name,
      group_sessions: data.groupIds.map((groupId): TribeGroupCheckpoint => {
        const gc = onDate.find(
          (it) => it.sessions.groupId == groupId && it.sessions.name == name,
        );
        if (!gc) {
          return {
            group_id: groupId,
            status: SessionStatus.NOT_STARTED,
            session: null,
          };
        }

        const start = new Date(gc.sessions.startTime).getTime();
        const end = start + gc.sessions.duration * 60 * 1000;
        const users =
          groupUserData.find((it) => it.groupId == groupId)?.users ?? [];
        const stars = gc.checkpoints
          .map((it) => it.stars)
          .filter((it): it is number => it != null);

        return {
          group_id: groupId,
          status: Date.now() < end ? SessionStatus.OPEN : SessionStatus.CLOSED,
          session: {
            session_id: gc.sessions.id,
            started_time: gc.sessions.startTime,
            presences: gc.checkpoints.map((cp) => {
              const u = users.find((it) => it.user_id == cp.groupUser);
              return {
                presence: cp.presence ?? "",
                name: u ? `${u.first_name} ${u.last_name}` : "Onbekend",
              };
            }),
            average_stars:
              stars.length == 0
                ? null
                : (stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(1),
          },
        };
      }),
    }));

    return HttpResponse.json(result);
  }),
  http.get("/api/tribes/:tid/sessions/dates", ({ params, request }) => {
    const data = getTribeSessions(params.tid as string);
    if (!data) return HttpResponse.json(TRIBE_NOT_FOUND, { status: 404 });

    const url = new URL(request.url);
    let dates = [
      ...new Set(
        data.sessions.map((it) =>
          toScrumdappDate(new Date(it.sessions.startTime)),
        ),
      ),
    ]
      .sort()
      .reverse();

    if (url.searchParams.has("month")) {
      const month = parseYearMonth(url.searchParams.get("month")!);
      const first = getWeekStart(firstDayOfMonth(month)).getTime();
      const last = getWeekEnd(lastDayOfMonth(month)).getTime();
      dates = dates.filter((it) => {
        const d = parseScrumdappDate(it).getTime();
        return d >= first && d <= last;
      });
    } else {
      dates = dates.slice(0, parseInt(url.searchParams.get("limit") ?? "10"));
    }

    const today = toScrumdappDate(new Date());
    return HttpResponse.json<TribeCheckpointDates>({
      from_date: dates.at(-1) ?? today,
      to_date: dates[0] ?? today,
      dates,
    });
  }),

  http.get("/api/tribes/:tid/sessions/months", ({ params }) => {
    const data = getTribeSessions(params.tid as string);
    if (!data) return HttpResponse.json(TRIBE_NOT_FOUND, { status: 404 });

    const months = new Set(
      data.sessions.map((it) => getYearMonth(new Date(it.sessions.startTime))),
    );
    return HttpResponse.json<string[]>([...months].sort().reverse());
  }),
];
