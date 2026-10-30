import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useApi } from "../../../../js/hooks/api/useApi.ts";
import { InviteResponse } from "../../../../js/models/invites.tsx";
import useTempState from "../../../../js/hooks/useTempState.ts";
import { useTranslation } from "react-i18next";
import InviteComponentModal from "../../../modals/InviteComponentModal.tsx";

interface InvitesProps {
  groupId: number;
}

export default function Invites({ groupId }: InvitesProps) {
  const { t } = useTranslation();
  const modal = useModalState();
  const [modalKey, setModalKey] = useState(0);
  const getGroupInvites = useApi(ScrumdappApi.GetGroupInvites());
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const [copiedId, setCopiedId] = useTempState<number>(null);

  const refreshInvites = async () => {
    setInvites(await getGroupInvites.runCommand(groupId));
  };

  useEffect(() => {
    getGroupInvites.runCommand(groupId).then(setInvites);
  }, [groupId]);

  const handleCopyInvite = (invite: InviteResponse) => {
    const link = `${window.location.origin}/invites/${invite.id}?token=${invite.token}`;
    navigator.clipboard.writeText(link);
    setCopiedId(invite.id);
  };

  function handleOpenModal() {
    setModalKey((k) => k + 1);
    modal.open();
  }

  return (
    <>
      <div className="card flex flex-col items-center gap-2">
        <div className="flex flex-row w-full justify-between items-center py-3">
          <h3>{t("invite.header")}</h3>
          <button
            onClick={handleOpenModal}
            className="btn btn-secondary border"
          >
            {t("invite.create")}
          </button>
        </div>
        <div className="w-full">
          {invites.length === 0 ? (
            <p>{t("invite.noinvites")}</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="p-2 text-left">{t("invite.expire")}</th>
                </tr>
              </thead>
              <tbody>
                {invites.map((invite) => {
                  const expired = new Date(invite.expiresAt) < new Date();
                  return (
                    <tr key={invite.id}>
                      <td className="p-2">
                        {new Date(invite.expiresAt).toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleCopyInvite(invite)}
                          className="btn btn-secondary border my-1 float-right"
                          disabled={expired}
                        >
                          <FontAwesomeIcon
                            icon={copiedId === invite.id ? faCheck : faCopy}
                          />
                          {copiedId === invite.id
                            ? " Copied!"
                            : expired
                              ? t("invite.expired")
                              : t("invite.modal.copy")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <InviteComponentModal
        key={modalKey}
        modal={modal}
        groupId={groupId}
        onCreated={refreshInvites}
      />
    </>
  );
}
