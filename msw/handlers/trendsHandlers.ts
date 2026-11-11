import {
  GroupPresenceTrends,
  PresenceCounts,
  PresenceTrendDay,
  PresenceTrendDayItem,
  UserTrendCalendar,
  UserTrendMood,
  UserTrendMoodPoint,
  UserTrendPeriod,
  UserTrendPeriodDataPoint,
  UserTrendSummary,
} from "../../src/js/models/trends";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../src/js/utils/scrumdappDate";
import { GroupUserCollection, groupUserData } from "./groupUserHandler";
import { PRESENCE_FIELDS as groupPresence } from "./groupCheckpointHandlers";
import { http, HttpResponse } from "msw";

const PRESENCE_FIELDS = [
  ...groupPresence,
  "ON_TIME",
  "ON_TIME",
  "ON_TIME",
  "ON_TIME",
  "ON_TIME",
  null,
];

const trendData: { [groupId: number]: GroupPresenceTrends } = {};

const name = ["Check-in", "Check-up", "Check-out", "Check-night"];

for (const group of groupUserData) {
  createFakeTrendsData(group);
}

function createFakeTrendsData(group: GroupUserCollection) {
  const days = 10 + Math.floor(Math.random() * 10);
  const maxCheckins = 1 + Math.floor(Math.random() * 4);
  const dayToMs = 24 * 60 * 60 * 1000;

  const end = parseScrumdappDate(toScrumdappDate(new Date()));
  const start = new Date(end.getTime() - (days - 1) * dayToMs);

  const data: GroupPresenceTrends = {
    fromDate: toScrumdappDate(start),
    toDate: toScrumdappDate(end),
    trends: [],
  };

  for (let i = 0; i < group.users.length; i++) {
    const user = group.users[i];
    const daysData: PresenceTrendDay[] = [];

    for (let day = 0; day < days; day++) {
      const date = start.getTime() + day * dayToMs;
      const presences: PresenceTrendDayItem[] = [];

      for (let p = 0; p < maxCheckins; p++) {
        presences.push({
          name: name[p],
          sessionId: Math.floor(Math.random() * 999999),
          presence:
            PRESENCE_FIELDS[Math.floor(Math.random() * PRESENCE_FIELDS.length)],
        });
      }

      daysData.push({
        date: toScrumdappDate(new Date(date)),
        presences,
      });
    }

    data.trends.push({
      userId: user.user_id,
      days: daysData,
    });
  }

  trendData[group.groupId] = data;
}

// Simple random data in the shape of the trends-service responses.

const CALENDAR_STATUSES = ["present", "present", "present", "present", "late", "sick", "absent", null];

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomCounts(): PresenceCounts {
  return { on_time: randomInt(15), delayed: randomInt(5), no_data: randomInt(3) };
}

// Parses "YYYY-MM-DD" as a local date, so toScrumdappDate gives the same day back
function parseLocalDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

// All weekdays from `from` up to and including `to`, but never after today
function weekdaysBetween(from: Date, to: Date) {
  const today = new Date();
  const end = to < today ? to : today;
  const days: Date[] = [];
  for (let d = new Date(from); d <= end; d.setDate(d.getDate() + 1)) {
    if (!isWeekend(d)) days.push(new Date(d));
  }
  return days;
}

export const trendsHandlers = [
  http.get("/api/trends/grouptimeline/:gid", ({ params }) => {
    return HttpResponse.json(trendData[parseInt(params["gid"] as string)]);
  }),

  http.get("/api/groups/:gid/trends/users/:uid/summary", () => {
    const summary: UserTrendSummary = {
      presence: {
        current_week: randomCounts(),
        last_week: randomCounts(),
        this_month: randomCounts(),
        last_month: randomCounts(),
      },
      stars: { average: 4 + Math.round(Math.random() * 60) / 10, count: 5 + randomInt(30) },
    };
    return HttpResponse.json(summary);
  }),

  http.get("/api/groups/:gid/trends/users/:uid/calendar", ({ request }) => {
    const month = new URL(request.url).searchParams.get("month") ?? toScrumdappDate(new Date()).slice(0, 7);
    const first = parseLocalDate(`${month}-01`);
    const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);

    const calendar: UserTrendCalendar = {
      month,
      days: weekdaysBetween(first, last).map((day) => ({
        date: toScrumdappDate(day),
        details: name.slice(0, 2).map((session) => ({
          name: session,
          status: CALENDAR_STATUSES[randomInt(CALENDAR_STATUSES.length)],
        })),
      })),
    };
    return HttpResponse.json(calendar);
  }),

  http.get("/api/groups/:gid/trends/users/:uid/mood", ({ request }) => {
    const query = new URL(request.url).searchParams;
    const fromDate = query.get("fromDate") ?? toScrumdappDate(new Date());
    const toDate = query.get("toDate") ?? toScrumdappDate(new Date());

    // Score on a 0-10 scale (10 = 5 stars), one point per weekday
    const points: UserTrendMoodPoint[] = weekdaysBetween(parseLocalDate(fromDate), parseLocalDate(toDate)).map((day) => ({
      date: toScrumdappDate(day),
      session_name: name[0],
      score: 2 * (1 + randomInt(5)),
    }));
    const average = points.length ? points.reduce((sum, p) => sum + p.score, 0) / points.length : null;

    const mood: UserTrendMood = { from_date: fromDate, to_date: toDate, average, count: points.length, points };
    return HttpResponse.json(mood);
  }),

  http.get("/api/groups/:gid/trends/users/:uid/period", ({ request }) => {
    const query = new URL(request.url).searchParams;
    const fromDate = query.get("fromDate") ?? toScrumdappDate(new Date());
    const toDate = query.get("toDate") ?? toScrumdappDate(new Date());
    const end = parseLocalDate(toDate);

    // One data point per two weeks, like the real api
    const dataPoints: UserTrendPeriodDataPoint[] = [];
    for (let start = parseLocalDate(fromDate); start <= end; start.setDate(start.getDate() + 14)) {
      const pointEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 13);
      dataPoints.push({
        from_date: toScrumdappDate(start),
        to_date: toScrumdappDate(pointEnd < end ? pointEnd : end),
        present: 5 + randomInt(5),
        sick: randomInt(2),
        late: randomInt(3),
        absent: randomInt(2),
        no_data: randomInt(2),
      });
    }

    const period: UserTrendPeriod = { from_date: fromDate, to_date: toDate, data_points: dataPoints };
    return HttpResponse.json(period);
  }),
];
