import {GroupCheckin} from "../../src/js/models/checkin";
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
        if (!group) continue
        const groupUsers = groupUserData.find(it => it.groupId == checkin.gId)
        if (!groupUsers) continue
        for (let uid of groupUsers.users) {
            const now = Date.now()
            for (let i = 0; i < checkin.dateCount; i++) {
                const day = new Date(now - (1000*60*60*24) * i)
                checkins.push(generateCheckin(uid, group.id, `${day.getFullYear()}-${day.getMonth()}-${day.getDay()}`, group.enabled_features))
            }
        }
    }

    return checkins;
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

export const groupCheckinsHandlers = [
    http.get("/groups/:gid/users/:uid/checkins", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.user_id == params.uid && it.group_id == params.gid))
        return HttpResponse.json(checkins)
    }),
    http.get("/groups/:gid/users/:uid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.find(it => it.user_id == params.uid && it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    }),
    http.patch("/groups/:gid/users/:uid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.find(it => it.user_id == params.uid && it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    }),
    http.get("/groups/:gid/checkins", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid))
        return HttpResponse.json(checkins)
    }),
    http.get("/groups/:gid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    }),
    http.patch("/groups/:gid/checkins/:date", ({params}) => {
        // @ts-ignore
        const checkins = (groupCheckins.filter(it => it.group_id == params.gid && it.date == params.date))
        return HttpResponse.json(checkins)
    })
]