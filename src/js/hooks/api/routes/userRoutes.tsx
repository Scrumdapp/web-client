import {createProcessor, makeApiRequest} from "../apiUtils.ts";
import {PartialUser, PatchUser, User} from "../../../models/user.ts";


export function getCurrentUser() {
    return createProcessor("getCurrentUser", () => {
        return makeApiRequest<User>("GET", "/users/@me")
    })
}

export function updateCurrentUser() {
    return createProcessor("updateCurrentUser", (body: PatchUser) => {
        return makeApiRequest<User>("PATCH", "/users/@me", {
            body: body
        })
    })
}

export function getUserData() {
    return createProcessor("getUserData", (id: number) => {
        return makeApiRequest<PartialUser>("GET", "/users/{id}", {
            params: { "{id}": id.toString() }
        })
    })
}