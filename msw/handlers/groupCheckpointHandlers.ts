import {http, HttpResponse} from "msw";
import {GroupCheckpoint, GroupCheckpointSession} from "../../src/js/models/checkpoint";
import {groupData} from "./groupHandlers";
import {groupUserData} from "./groupUserHandler";
import {parseScrumdappDate, toScrumdappDate} from "../../src/js/utils/scrumdappDate";


const PRESENCE_FIELDS = [ "ON_TIME", "ONLINE", "LATE", "ABSENT", "VERIFIED_LATE", "VERIFIED_ABSENT" ]
const RANDOM_COMMENT = [
    undefined, undefined, undefined, undefined,
    "jrkegbayunhgjlianhbgbahngamjgnahk",
    "Jij hebt geen drink privileges meer",
    "...",
    "Ewa drerrie",
    "Ik heb goed nieuws, we zijn van een 500 error naar een 404 gegaan",
    "Wat?",
    "Ik ben random comments aan het schrijven",
    "Dat zeg jij altijd",
    "Jullie hebben al silence?",
    "Dit is niet hoe je random zooi bedenkt",
    "Dus, hobbies?",
    "Ik ben Hendrik, ik ben een meter, nu ben ik leeg, maar vol smaak ik beter. Maar wat moet je nou, als je leeg bent? Dan kun je niet zuipen, als een echte Student. MVO",
    "Lorem Ipsum"
]
const RANDOM_IMPEDIMENT = [
    undefined, undefined, undefined, undefined,
    "Chat gpt wou niet meewerken",
    "Moest effe mijn hond uitlaten, daardoor werk niet klaar",
    "shit is vervelend aan het doen",
    "Het maken van een dockerfile bleek toch moeilijker zijn dan verwacht",
    "Ik werd enorm afgeleid door al het geluid in het lokaal",
    "Ik kwam er echt niet uit waarom mijn div niet wou centreren",
    "Het verwijderen van de franse languagepack van mijn laptop had toch een paar onverwachte gevolgen",
    "Mijn pc is gebluescreened"
]

interface GenSessions {
    gId: number,
    dateCount: number,
    sessionPerDay: number
}

interface GenCheckpoints {
    sessions: GroupCheckpointSession,
    checkpoints: GroupCheckpoint[]
}

const groupCheckpoints: GenCheckpoints[] = generateCheckpoints({
    gId: 1,
    dateCount: 10,
    sessionPerDay: 3,
}, {
    gId: 2,
    dateCount: 10,
    sessionPerDay: 2,
}, {
    gId: 3,
    dateCount: 10,
    sessionPerDay: 5,
}
)

function generateCheckpoints(...data: GenSessions[]): GenCheckpoints[] {

    const sessions: GenCheckpoints[] = []

    for (let session of data) {
        const group = groupData.find(it => it.id == session.gId)
        if (typeof group === "undefined") { continue }

        const groupUsers = groupUserData.find(it => it.groupId == session.gId)
        if (!groupUsers) { continue }
        const users = groupUsers.users

        const now = Date.now()
        for (let i = 0; i < session.dateCount; i++) {
            const day = new Date(now - (1000*60*60*24) * i)
            for (let j = 0; j < session.sessionPerDay; j++) {
                const randomUser = Math.floor(Math.random() * users.length)
                const session = generateSession(Math.floor(Math.random() * 6900), group!.id, users[randomUser], day)

                const checkpoints: GroupCheckpoint[] = []
                for (let u of users) {
                    checkpoints.push(generateCheckpoint(session.id, u))
                }

                sessions.push({
                    sessions: session,
                    checkpoints: checkpoints
                })
            }
        }
    }
    return sessions
}

function generateSession(id: number, gId: number, oId: number, date: Date ): GroupCheckpointSession {
    return {
        id: id,
        groupId: gId,
        ownerId: oId,
        date: toScrumdappDate(date),
        startTime: generateRandomTime(date),
        duration: 15,
    }
}

function generateCheckpoint(sId: number, uId: number): GroupCheckpoint  {
    return {
        groupUser: uId,
        sessionId: sId,
        id: Math.floor(Math.random() * 696969696969),

        presence: Math.random() > 0.7 ? PRESENCE_FIELDS[0] : PRESENCE_FIELDS[Math.floor(Math.random() * PRESENCE_FIELDS.length)],
        impediment: Math.random() > 0.6 ? undefined : RANDOM_IMPEDIMENT[Math.floor(Math.random() * RANDOM_IMPEDIMENT.length)],
        stars: Math.random() > 0.7 ? undefined: Math.floor(Math.random() * 11),
        comment: Math.random() > 0.8 ? undefined : RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }
}

function generateRandomTime(now: Date): string {

    now.setHours(9 + Math.random() * (17 - 9) | 9)
    now.setMinutes(Math.random() * 60)

    const dateText = now.toTimeString()
    return dateText.split(' ')[0]
}

export const groupCheckpointHandlers = [
    http.get("/api/groups/:gid/sessions", ({params, request}) => {
        const url = new URL(request.url)

        const from = url.searchParams.get("start_date")
        const to = url.searchParams.get("end_date")
        const date = url.searchParams.get("date")


        const sessions = groupCheckpoints.map(it => it.sessions)

        const filteredSession = sessions.filter(it => {
            // @ts-ignore
            if (it.groupId !== parseInt(params.gid)) return false

            if (from && it.date < from) return false
            if (to && it.date > to) return false
            if (date && it.date !== date) return false

            return true
        })

        return HttpResponse.json(filteredSession)
    }),
    http.post("/api/groups/:gid/sessions", ({params}) => {
        
    }),
    http.get("/api/groups/:gid/sessions/:sid", ({params}) => {

        // @ts-ignore
        const sessions = groupCheckpoints.map(it => it.sessions).filter(it => it.groupId == parseInt(params.gid) && it.id == parseInt(params.sid))
        return HttpResponse.json(sessions)
    }),
    http.get("/api/groups/:gid/checkpoints", ({params, request}) => {
        const url = new URL(request.url)
        const sessionParam = url.searchParams.get("session")
        const userParam = url.searchParams.get("user")

        const sId = sessionParam ? parseInt(sessionParam) : null
        const uId = userParam ? parseInt(userParam) : null

        let sessionIds: number[] = []

        if (sId !== null && !isNaN(sId)) {
            sessionIds.push(sId)
        } else {

            sessionIds = groupCheckpoints
                .flatMap(it => it.sessions)
                // @ts-ignore
                .filter(it => it.groupId == parseInt(params.gid))
                .map(it => it.id)
        }

        const checkpoints = groupCheckpoints.flatMap(it => it.checkpoints)

        const filtered = checkpoints.filter(it => {
            if (!sessionIds.includes(it.sessionId)) return false
            if (uId !== null && !isNaN(uId) && it.groupUser !== uId) return false
            return true
        })

        return HttpResponse.json(filtered)
    }),
    http.get("/api/groups/:gid/checkpoints/:cid", ({params}) => {
        // @ts-ignore
        const session = groupCheckpoints.map(it => it.sessions).filter(it => it.groupId == parseInt(params.gid) && it.id == parseInt(params.cid))[0]

        const checkpoints = groupCheckpoints.map(it => it.checkpoints).flat().filter(it => it.sessionId == session.id)

        return HttpResponse.json(checkpoints)
    }),
    http.patch("/api/groups/:gid/checkpoints/:cid", ({params}) => {
        // @ts-ignore
        const session = groupCheckpoints.map(it => it.sessions).filter(it => it.groupId == parseInt(params.gid) && it.id == parseInt(params.cid))[0]

        const checkpoints = groupCheckpoints.map(it => it.checkpoints).flat().filter(it => it.sessionId == session.id)

        return HttpResponse.json(checkpoints)
    })
]