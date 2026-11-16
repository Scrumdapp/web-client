import { http, HttpResponse } from "msw";
import { Tribe } from "../../src/js/models/tribe";
import { groupData } from "./groupHandlers";
import { groupCheckpoints } from "./groupCheckpointHandlers";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../src/js/utils/scrumdappDate";
import {
  firstDayOfMonth,
  getWeekEnd,
  getWeekStart,
  lastDayOfMonth,
  parseYearMonth,
} from "../../src/js/utils/timeUtils";
import { SessionDates } from "../../src/js/models/checkpoint";

export const tribeData: Tribe[] = [
  {
    id: 1,
    name: "Tribe Vince & Merijn",
    background_preference: "7_2",
    group_count: 4,
    member_count: 32,
    is_active: true,
    groups: groupData,
    owner_id: 102,
  },
  {
    id: 2,
    name: "Tribe Hidde & Yara",
    background_preference: "color_red",
    group_count: 2,
    member_count: 8,
    is_active: true,
    groups: groupData.slice(0, 2),
    owner_id: 102,
  },
  {
    id: 3,
    name: "Tribe Ole",
    background_preference: "22",
    group_count: 3,
    member_count: 17,
    is_active: true,
    groups: groupData.slice(0, 3),
    owner_id: 102,
  },
  {
    id: 4,
    name: "Tribe Roelof",
    background_preference: "22",
    group_count: 1,
    member_count: 6,
    is_active: false,
    groups: groupData.slice(0, 1),
    owner_id: 102,
  },
];

export const tribeHandlers = [
  http.get("/api/tribes", async ({}) => {
    return HttpResponse.json(tribeData.filter((it) => it.id < 5));
  }),
  http.post("/api/tribes", ({}) => {
    const tribe = tribeData[0];
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.get("/api/tribes/:tid", async ({ params }) => {
    // @ts-ignore
    const tribe = tribeData.find((it) => it.id == params.tid);
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),
  http.patch("/api/tribes/:tid", ({ params }) => {
    // @ts-ignore
    const tribe = tribeData.find((it) => it.id == params.tid);
    if (tribe) {
      return HttpResponse.json(tribe);
    }
    return HttpResponse.json(
      {
        status: 404,
        code: "TRIBE_NOT_FOUND",
        titleTranslationKey: "errors.tribe.notFound.title",
        descriptionTranslationKey: "errors.tribe.notFound.description",
      } as object,
      {
        status: 404,
      },
    );
  }),

  http.get("/api/tribes/:tid/sessions/dates", ({ params, request }) => {
    const sessions = groupCheckpoints.filter(
      (it) => it.sessions.groupId == parseInt(params.tid as string),
    );
    const url = new URL(request.url);

    const uniqueDates = new Set<string>(
      sessions.map((it) => toScrumdappDate(new Date(it.sessions.startTime))),
    );
    let dates = Array.from(uniqueDates).sort().reverse();

    if (url.searchParams.has("month")) {
      const month = parseYearMonth(url.searchParams.get("month")!);
      const firstDay = getWeekStart(firstDayOfMonth(month)).getTime();
      const lastDay = getWeekEnd(lastDayOfMonth(month)).getTime();

      dates = dates.filter((it) => {
        const d = parseScrumdappDate(it).getTime();
        return d >= firstDay && d <= lastDay;
      });
    } else {
      const limit = parseInt(url.searchParams.get("limit") ?? "10");
      dates = dates.slice(0, limit);
    }

    return HttpResponse.json<SessionDates>({
      fromDate:
        dates.length == 0
          ? toScrumdappDate(new Date())
          : dates[dates.length - 1],
      toDate: dates.length == 0 ? toScrumdappDate(new Date()) : dates[0],
      dates: dates.map((it) => ({
        date: it,
        sessions: groupCheckpoints
          .filter(
            (cp) => toScrumdappDate(new Date(cp.sessions.startTime)) == it,
          )
          .map((cp) => cp.sessions.id),
      })),
    });
  }),
];
