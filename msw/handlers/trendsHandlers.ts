import { GroupPresenceTrends, PresenceTrendDay, PresenceTrendDayItem } from "../../src/js/models/trends";
import { parseScrumdappDate, toScrumdappDate } from "../../src/js/utils/scrumdappDate";
import { GroupUserCollection, groupUserData } from "./groupUserHandler";
import { PRESENCE_FIELDS as groupPresence } from "./groupCheckpointHandlers";
import { http, HttpResponse } from "msw";

const PRESENCE_FIELDS = [...groupPresence, "ON_TIME", "ON_TIME", "ON_TIME", "ON_TIME", "ON_TIME", null]

const trendData: { [groupId: number]: GroupPresenceTrends } = {}

const name = ["Check-in", "Check-up", "Check-out", "Check-night"]

for (const group of groupUserData) {
    createFakeTrendsData(group);
}

function createFakeTrendsData(group: GroupUserCollection) {
    const days = 10 + Math.floor(Math.random() * 10)
    const maxCheckins = 1 + Math.floor(Math.random() * 4)
    const dayToMs = 24 * 60 * 60 * 1000

    const end = parseScrumdappDate(toScrumdappDate(new Date()))
    const start = new Date(end.getTime() + days * dayToMs)

    const data: GroupPresenceTrends = {
        fromDate: toScrumdappDate(start),
        toDate: toScrumdappDate(end),
        trends: []
    }

    for (let i = 0; i < group.users.length; i++) {
        const userId = group.users[i];
        const daysData: PresenceTrendDay[] = [];

        for (let day = 0; day < days; day++) {
            const date = start.getTime() + day * dayToMs
            const presences: PresenceTrendDayItem[] = []

            for (let p = 0; p < maxCheckins; p++) {
                presences.push({
                    name: name[p],
                    sessionId: Math.floor(Math.random() * 999999),
                    presence: PRESENCE_FIELDS[Math.floor(Math.random() * PRESENCE_FIELDS.length)]
                })
            }

            daysData.push({
                date: toScrumdappDate(new Date(date)),
                presences
            })
        }

        data.trends.push({
            userId: userId,
            days: daysData
        })
    }

    console.log(data, maxCheckins)

    trendData[group.groupId] = data
}



export const trendsHandlers = [
    http.get("/api/trends/grouptimeline/:gid", ({ params }) => {
        return HttpResponse.json(trendData[parseInt(params["gid"] as string)])
    })
]
