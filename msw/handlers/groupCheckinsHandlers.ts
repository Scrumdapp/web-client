import {CheckinFieldFlags, GroupCheckin} from "../../src/js/models/checkin";
import {groupData} from "./groupHandlers";
import {groupUserData} from "./groupUserHandler";
import {Feature} from "../../src/js/models/group";
import {http, HttpResponse} from "msw";

interface GenerateCheckin {
    gId: number,
    dateCount: number
}

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

const groupCheckins: GroupCheckin[] = generateGroupCheckins({
    gId: 1,
    dateCount: 10,
}, {
    gId: 2,
    dateCount: 10
}, {
    gId: 3,
    dateCount: 10
})

function generateGroupCheckins(...data: GenerateCheckin[]): GroupCheckin[] {
    const checkins: GroupCheckin[] = []

    for (let checkin of data) {
        const group = groupData.find(it => it.id == checkin.gId)
        if (typeof group === "undefined") continue
        const groupUsers = groupUserData.find(it => it.groupId == checkin.gId)
        if (!groupUsers) continue
        for (let uid of groupUsers.users) {
            const now = Date.now()
            for (let i = 0; i < checkin.dateCount; i++) {
                const day = new Date(now - (1000*60*60*24) * i)
                checkins.push(generateCheckin(uid, group!.id, `${day.getFullYear()}-${parseInt(day.getMonth()+1)}-${parseInt(day.getDate())}`, group!.enabled_features))
            }
        }
    }

    return checkins;
}

function parseInt(i: number): string {
    let s = i.toString()
    while (s.length < 2) {
        s = "0"+s
    }
    return s
}

function generateCheckin(userId: number, groupId: number, date: string, features: Feature[]): GroupCheckin {
    const checkin: GroupCheckin = {
        user_id: userId,
        group_id: groupId,
        date: date,
    }

    if (features.indexOf("checkins.presence") != -1) {
        checkin.presence = PRESENCE_FIELDS[Math.floor(Math.random() * PRESENCE_FIELDS.length)]
    }

    if (features.indexOf("checkins.checkin_stars") != -1) {
        checkin.checkin_stars = Math.floor(Math.random() * 11)
    }

    if (features.indexOf("checkins.checkup_stars") != -1) {
        checkin.checkup_stars = Math.floor(Math.random() * 11)
    }

    if (features.indexOf("checkins.checkout_stars") != -1) {
        checkin.checkout_stars = Math.floor(Math.random() * 11)
    }

    if (features.indexOf("checkins.presence_comment") != -1) {
        checkin.presence_comment = RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }

    if (features.indexOf("checkins.checkin_comment") != -1) {
        checkin.checkin_comment = RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }

    if (features.indexOf("checkins.checkup_comment") != -1) {
        checkin.checkup_comment = RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }

    if (features.indexOf("checkins.checkout_comment") != -1) {
        checkin.checkout_comment = RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }

    if (features.indexOf("checkins.obstacle_comment") != -1) {
        checkin.obstacle_comment = RANDOM_COMMENT[Math.floor(Math.random() * RANDOM_COMMENT.length)]
    }

    return checkin;
}

function parseCheckinFields(fields: string | null | undefined, checkin: GroupCheckin): object {
    const r = {
        user_id: checkin.user_id,
        group_id: checkin.group_id,
        date: checkin.date
    }

    if (typeof fields !== "string") {
        return r;
    }

    const all = fields.split(",")
    for (let i = 0; i < all.length; i++) {
        switch (all[i].toLowerCase()) {
            case "presence": r["presence"] = checkin.presence ?? null; break
            case "presence_comment": r["presence_comment"] = checkin.presence_comment ?? null; break
            case "checkin_stars": r["checkin_stars"] = checkin.checkin_stars ?? null; break
            case "checkin_comment": r["checkin_comment"] = checkin.checkin_comment ?? null; break
            case "checkup_stars": r["checkup_stars"] = checkin.checkup_stars ?? null; break
            case "checkup_comment": r["checkup_comment"] = checkin.checkup_comment ?? null; break
            case "checkout_stars": r["checkout_stars"] = checkin.checkout_stars ?? null; break
            case "checkout_comment": r["checkout_comment"] = checkin.checkout_comment ?? null; break
            case "obstacle_comment": r["obstacle_comment"] = checkin.obstacle_comment ?? null; break
        }
    }

    return r;
}

export const groupCheckinsHandlers = [
    http.get("/api/groups/:gid/users/:uid/checkins", ({params, request}) => {
        const url = new URL(request.url)
        const fields = url.searchParams.get("fields")
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.user_id == params.uid && it.group_id == params.gid))
        return HttpResponse.json(checkins.map(it => parseCheckinFields(fields, it)))
    }),
    http.get("/api/groups/:gid/users/:uid/checkins/:date", ({params, request}) => {
        const url = new URL(request.url)
        const date = url.searchParams.get("date")
        const fields = url.searchParams.get("fields")
        // @ts-ignore
        const checkin = (groupCheckins.find(it => it.user_id == params.uid && it.group_id == params.gid && it.date == date))
        if (typeof checkin !== "object") {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "Not Found",
                detail: "Checkin could not be found"
            })
        }
        return HttpResponse.json(parseCheckinFields(fields, checkin))
    }),
    http.patch("/api/groups/:gid/users/:uid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.find(it => it.user_id == params.uid && it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    }),
    http.get("/api/groups/:gid/checkins", ({params}) => {
        // @ts-ignore
        const url = new URL(request.url)
        const fields = url.searchParams.get("fields")
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid))
        return HttpResponse.json(checkins.map(it => parseCheckinFields(fields, it)))
    }),
    http.get("/api/groups/:gid/checkins/:date", ({params}) => {
        // @ts-ignore
        const url = new URL(request.url)
        const fields = url.searchParams.get("fields")
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins.map(it => parseCheckinFields(fields, it)))
    }),
    http.patch("/api/groups/:gid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    })
]