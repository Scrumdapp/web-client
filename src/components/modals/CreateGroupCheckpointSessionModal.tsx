import { ModalState } from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { useTranslation } from "react-i18next";
import { CheckpointTimeDurationDropdownMenu } from "../generic/CheckpointTimeDuration.tsx";

export function CreateGroupCheckpointSessionModal({
  groupId,
  state,
  onCreated,
}: {
  groupId: number;
  state: ModalState;
  onCreated?: (session: GroupCheckpointSession) => void;
}) {
  const { t } = useTranslation();
  const [checkpointName, setCheckpointName] = useState("");
  const [showWarning] = useState(false);
  const [expireMinutes, setExpireMinutes] = useState(15);
  const createCheckpointSession = useApi(
    ScrumdappApi.createCheckpointSessions(),
  );

  const handleCreate = async () => {
    if (!checkpointName.trim()) return;

    const session = await createCheckpointSession.runCommand(groupId, {
      name: checkpointName,
      duration: expireMinutes,
    });

    onCreated?.(session);
    setCheckpointName("");
    state.accept();
  };

  const { names } = useCheckpointNames();
  const hasNames = names.length > 0;

  return (
    <Modal state={state}>
      <div className="space-y-5">
        <ModalHeadText>{t("checkpoint.modal.newcheckpoint")}</ModalHeadText>
        <div className="horizontal flex-1 gap-2">
          {!hasNames && (
            <p className="text-red text-sm">{t("checkpoint.modal.error")}</p>
          )}

          <select
            className="write-section w-full!"
            aria-label={t("checkpoint.modal.name")}
            value={checkpointName}
            onChange={(e) => setCheckpointName(e.target.value)}
            disabled={!hasNames}
            required
          >
            <option value="" disabled>
              {t("checkpoint.modal.name")}
            </option>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <CheckpointTimeDurationDropdownMenu
            value={expireMinutes}
            onChange={(v) => setExpireMinutes(v ?? 15)}
          />
        </div>
        {showWarning && (
          <p className="text-red text-sm">{t("checkpoint.modal.error")}</p>
        )}
        <ModalActionRow>
          <ModalCancelButton />
          <button
            className={`btn btn-secondary border ${!checkpointName ? "opacity-50 cursor-not-allowed!" : ""}`}
            disabled={
              !hasNames || !checkpointName || createCheckpointSession.loading
            }
            onClick={handleCreate}
          >
            <FontAwesomeIcon icon={faCheck} className="icon" />
            {createCheckpointSession.loading ? (
              <LoadScreen />
            ) : (
              t("checkpoint.modal.create")
            )}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
