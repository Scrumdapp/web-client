import {User} from "../../src/js/models/user";
import {http, HttpResponse} from "msw";

const users: User[] = [
    {
        id: 1,
        first_name: "Gary",
        last_name: "Goodspeed",
        language_preference: "EN",
        theme_preference: null
    },
    {
        id: 2,
        first_name: "Quinn",
        last_name: "Ergon",
        language_preference: "NL",
        theme_preference: "light"
    },
    {
        id: 3,
        first_name: "Ash",
        last_name: "Graven",
        language_preference: "NL",
        theme_preference: "dark"
    },
    {
        id: 4,
        first_name: "KVN",
        last_name: "",
        language_preference: null,
        theme_preference: null
    }
]

export const userHandlers = [
    http.get("/api/users/@me", ({}) => {
        return HttpResponse.json(users[0])
    }),
    http.get("/api/users/:id", ({ params }) => {
        const user = users.find(it => it.id == params.id)
        if (user) {
            return HttpResponse.json(user)
        } else {
            return HttpResponse.json({
                error: true,
                status: 404,
                message: "User not found",
                detail: "This user does not exist"
            }, {
                status: 404
            })
        }
    })
]