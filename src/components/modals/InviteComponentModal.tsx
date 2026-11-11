import Modal from "../generic/modal/Modal.tsx";
import { InviteTimeDurationDropdownMenu } from "../generic/InviteTimeDuration.tsx";
import {
  FieldApiErrorMessage,
  FieldApiErrorMessageList,
} from "../generic/FieldApiErrorMessage.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import useTempState from "../../js/hooks/useTempState.ts";

type InviteComponentModalProps = {
  modal: ModalState;
  groupId: number;
  onCreated: () => void | Promise<void>;
};

export default function InviteComponentModal({
  modal,
  groupId,
  onCreated,
}: InviteComponentModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [expireHours, setExpireHours] = useState(12);
  const [generatedLink, setGeneratedLink] = useState("");
  const createInvite = useApi(ScrumdappApi.CreateInvite());
  const [copied, setCopied] = useTempState(false);

  async function handleCreateInvite() {
    const expiresAt = new Date(Date.now() + expireHours * 60 * 60 * 1000);
    const invite = await createInvite.runCommand(groupId, expiresAt, password);
    setGeneratedLink(
      `${window.location.origin}/invites/${invite.id}?token=${invite.token}`,
    );
    setStep(2);
    await onCreated();
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  };

  function handleDone() {
    modal.close();
  }

  return (
    <Modal state={modal}>
      {step === 1 && (
        <>
          <h1>{t("invite.createPassword")}</h1>
          <div className="flex justify-between py-2">
            <input
              className="write-section w-full! mr-2 flex-5"
              placeholder={t("invite.password")}
              alt={t("invite.password")}
              value={password}
              maxLength={32}
              onChange={(e) => {
                setShowWarning(
                  !/^[a-zA-Z0-9 !@#$%^&]{1,32}$/.test(e.target.value),
                );
                setPassword(e.target.value);
              }}
              required
            />
            <div className="flex flex-3">
              <InviteTimeDurationDropdownMenu
                onChange={(v) => setExpireHours(v ?? 12)}
              />
            </div>
          </div>
          {createInvite.error?.errors &&
          createInvite.error.errors.length > 1 ? (
            <FieldApiErrorMessageList errors={createInvite.error.errors} />
          ) : (
            <FieldApiErrorMessage
              errors={createInvite.error?.errors ?? null}
              field={createInvite.error?.errors?.[0]?.field ?? ""}
            />
          )}
          <ModalActionRow>
            <div className="py-2 flex gap-x-2">
              {showWarning && (
                <p className="text-red text-sm">{t("invite.modal.error")}</p>
              )}
              <ModalCancelButton />
              <button
                onClick={handleCreateInvite}
                className="btn btn-secondary border"
                disabled={!password.trim()}
              >
                <FontAwesomeIcon icon={faCheck} /> {t("invite.modal.create")}
              </button>
            </div>
          </ModalActionRow>
        </>
      )}
      {step === 2 && (
        <div>
          <h1>{t("invite.modal.header")}</h1>
          <p>{t("invite.modal.text")}</p>
          <div className="py-5 gap-2 flex flex-nowrap justify-between items-center">
            <p>{t("invite.modal.link")}</p>
            <span className="write-section p-2! overflow-hidden">
              {generatedLink}
            </span>
          </div>
          <ModalActionRow>
            <button onClick={handleCopy} className="btn border">
              <FontAwesomeIcon icon={faCopy} /> {t("invite.modal.copy")}
            </button>
            <button onClick={handleDone} className="btn btn-secondary border">
              <FontAwesomeIcon icon={faCheck} /> {t("invite.modal.done")}
            </button>
          </ModalActionRow>
          {copied && (
            <p className="text-right text-green-dim mt-2">
              {t("invite.modal.succes")}
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
