import { http, HttpResponse } from "msw";
import { WebConfig } from "../../src/config";

export const COOKIE_NAME = "ALLINDADDY";
const COOKIE_DAYS = 30;

export const userCookieHandler = [
  http.get(WebConfig.oauthLoginUrl, (req) => {
    const expires = new Date(Date.now() + COOKIE_DAYS * 86400).toUTCString();
    const userId = (req.params["userId"] as string) ?? "1";

    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie": `${COOKIE_NAME}=${userId}; expires=${expires}; path=/; SameSite=Strict;`,
      },
    });
  }),
  http.get(WebConfig.logoutUrl, () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Set-Cookie": `${COOKIE_NAME}=${0}; expires=${Date.now()}; path=/; SameSite=Strict;`,
      },
    });
  }),
];
