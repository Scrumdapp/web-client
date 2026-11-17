export namespace WebConfig {
  export const oauthLoginUrl: string =
    import.meta.env.VITE_OAUTH_LOGIN_URL ??
    "/api/oauth2/authorization/keycloak";

  export const logoutUrl: string =
    import.meta.env.VITE_LOGOUT_URL ?? "/api/oauth2/logout";

  export const apiUrl = (
    import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api"
  ).replace(/\/$/, "");
}
