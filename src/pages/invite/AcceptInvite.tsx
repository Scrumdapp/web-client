import { useNavigate } from "react-router-dom";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { useTranslation } from "react-i18next";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useState } from "react";
import { InviteResponse } from "../../js/models/invites.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function AcceptInvite({ invite }: { invite: InviteResponse }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const acceptInviteRequest = useApi(ScrumdappApi.AcceptInvite());

  const handleAcceptInvite = () => {
    acceptInviteRequest
      .runCommand(invite.id, invite.token, password)
      .then(() => navigate(`/groups/${invite.groupId}`))
      .catch((e) => console.error(e));
  };

  if (acceptInviteRequest.loading) {
    return (
      <div className="app-container">
        <LoadScreen />
      </div>
    );
  }

  return (
    <div className="app-container">
      <title>{t("invite.title")}</title>
      <div className="card flex flex-col">
        <h1>
          {t("invite.accept.header")} {invite.groupId}!
        </h1>
        <p>{t("invite.accept.text")}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAcceptInvite();
          }}
        >
          <div className="py-3">
            <label className="sr-only" htmlFor="invite-password">
              {t("invite.password")}
            </label>
            <input
              id="invite-password"
              type="password"
              autoComplete="current-password"
              className="write-section w-full!"
              placeholder={t("invite.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={acceptInviteRequest.error != null || undefined}
              aria-describedby={
                acceptInviteRequest.error != null
                  ? "invite-password-error"
                  : undefined
              }
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-secondary border flex float-right"
              disabled={acceptInviteRequest.loading}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              {t("invite.accept.join")}
            </button>
            {acceptInviteRequest.error != null && (
              <p id="invite-password-error" role="alert" className="text-red">
                {acceptInviteRequest.error.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
