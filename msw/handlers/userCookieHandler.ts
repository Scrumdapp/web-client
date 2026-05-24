import { http, HttpResponse } from "msw";

export const COOKIE_NAME = "ALLINDADDY";
const COOKIE_DAYS = 30;

const discordLoginUrl: string = import.meta.env.VITE_DISCORD_LOGIN_URL ?? "/api/oauth2/authorization/discord"

export const userCookieHandler = [
    http.get(discordLoginUrl, (req) => {
        const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
        const userId = req.params["userId"] as string ?? "1"

        return new HttpResponse(null, {
            status: 200,
            headers: {
                "Set-Cookie": `${COOKIE_NAME}=${userId}; expires=${expires}; path=/; SameSite=Strict;`,
            },
        });
    }),
];