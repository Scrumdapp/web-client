import {http, HttpResponse} from "msw";
import {Group} from "../../src/js/models/group";
import {groupUserData} from "./groupUserHandler.ts";

export const groupData: Group[] = [
    {
        id: 1,
        name: "Final Space",
        background_preference: undefined,
        icon_preference: undefined,
        enabled_features: [
            "checkins",
            "checkins.presence",
            "checkins.presence_comment",
            "checkins.checkin_stars",
            "checkins.checkup_stars",
            "checkins.checkout_stars",
            "checkins.checkin_comment",
            "checkins.checkup_comment",
            "checkins.checkout_comment",
            "checkins.obstacle_comment"
        ]
    },
    {
        id: 2,
        name: "Outer Space",
        background_preference: undefined,
        icon_preference: undefined,
        enabled_features: [
            "checkins",
            "checkins.presence",
            "checkins.presence_comment",
            "checkins.checkin_stars",
            "checkins.checkup_stars",
            "checkins.checkin_comment",
            "checkins.checkup_comment",
        ]
    },
    {
        id: 3,
        name: "Inner Space",
        background_preference: undefined,
        icon_preference: undefined,
        enabled_features: [
            "checkins",
            "checkins.presence",
            "checkins.presence_comment",
        ]
    }
]

export const groupHandlers = [
    http.get("/api/groups", ({}) => {
        return HttpResponse.json(groupData)
    }),
    http.post("/api/groups", ({}) => {
        const group = groupUserData[0]
        if (group) {
            return HttpResponse.json(group)
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    }),
    http.get("/api/groups/:gid", ({ params }) => {
        const group = groupData.find(it => it.id == params.gid)
        if (group) {
            return HttpResponse.json(group as object)
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    }),
    http.patch("/api/groups/:gid", ({ params }) => {
        const group = groupData.find(it => it.id == params.gid)
        if (group) {
            return HttpResponse.json(group as object)
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    }),
    http.delete("/api/groups?:gid", ({ params }) => {
        const group = groupData.find(it => it.id == params.gid)
        if (group) {
            return HttpResponse.json({ success: true })
        }
        return HttpResponse.json({
            error: true,
            status: 404,
            message: "Not found",
            detail: "The group with this ID does not exist"
        } as object, {
            status: 404
        })
    })
]