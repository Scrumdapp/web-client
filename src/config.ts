
export namespace WebConfig {
    export const discordLoginUrl: string = import.meta.env.VITE_DISCORD_LOGIN_URL ?? "/api/oauth2/authorization/discord"
    export const logoutUrl: string = import.meta.env.VITE_LOGOUT_URL ?? "/api/oauth2/logout"
}

