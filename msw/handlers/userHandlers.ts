import {User} from "../../src/js/models/user";
import {http, HttpResponse} from "msw";
import {ErrorDto} from "../../src/js/models/dto/errorDto.ts";

export const userData: User[] = [
    {
        id: 1,
        first_name: "Gary",
        last_name: "Goodspeed",
        language_preference: "EN",
        theme_preference: null
    } as User,
    {
        id: 2,
        first_name: "Quinn",
        last_name: "Ergon",
        language_preference: "NL",
        theme_preference: "light"
    } as User,
    {
        id: 3,
        first_name: "Ash",
        last_name: "Graven",
        language_preference: "NL",
        theme_preference: "dark"
    } as User,
    {
        id: 4,
        first_name: "KVN",
        last_name: "",
        language_preference: null,
        theme_preference: null
    } as User,
    {
        id: 5,
        first_name: "Klaas",
        last_name: "Kaaskop",
        language_preference: "EN",
        theme_preference: "dark"
    } as User,
    {
        id: 6,
        first_name: "Bob",
        last_name: "de Bouwer",
        language_preference: "NL",
        theme_preference: "light"
    } as User
]

export const userHandlers = [
    http.get("/api/users/@me", async ({}) => {

        let delayed = false
        let error = false

        if (delayed) {
            await new Promise((res) => {
                setTimeout(() => res(), 2000)
            })
        }

        if (error) {
            return HttpResponse.json({
                error: true,
                status: 401,
                message: "Not Auhtorized",
                detail: "You are not authorized to make this request",
            } as ErrorDto) as HttpResponse<any>
        }

        return HttpResponse.json(userData[0]) as HttpResponse<any>
    }),
]