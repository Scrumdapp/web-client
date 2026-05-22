import { http, HttpResponse } from "msw";

const COOKIE_NAME = "site_access";
const COOKIE_DAYS = 30;

export const userCookieHandler = [
    http.post("/login", () => {
        const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();

        return new HttpResponse(null, {
            status: 200,
            headers: {
                "set-cookie": `${COOKIE_NAME}=granted; expires=${expires}; path=/; SameSite=Lax`,
            },
        });
    }),
];