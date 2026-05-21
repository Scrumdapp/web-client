
//DO NOT USE IN PRODUCTION!!!!
//DO NOT USE IN PRODUCTION!!!!
//DO NOT USE IN PRODUCTION!!!!
//DO NOT USE IN PRODUCTION!!!!
//DO NOT USE IN PRODUCTION!!!!
//DO NOT USE IN PRODUCTION!!!!

import { useState } from "react";

const COOKIE_NAME = "site_access";
const COOKIE_DAYS = 30;

function getCookie(name: string): string | null {
    return (
        document.cookie
            .split("; ")
            .find((r) => r.startsWith(name + "="))
            ?.split("=")[1] ?? null
    );
}

function setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function useLoginCookie() {
    const [granted, setGranted] = useState<boolean>(() => getCookie(COOKIE_NAME) === "granted");

    function accept(): void {
        setCookie(COOKIE_NAME, "granted", COOKIE_DAYS);
        setGranted(true);
    }

    return { granted, accept };
}