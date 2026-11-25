import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import { AttendanceDropDownMenu } from "../checkins/checkpointcomponents/AttendanceDropDownMenu.tsx";
import { FieldApiErrorMessage } from "../generic/FieldApiErrorMessage.tsx";
import { StarsInputField } from "../checkins/checkpointcomponents/StarsInputField.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { SessionCheckpointRow } from "../../js/models/checkpoint.ts";

const updateCheckpointProcessor = ScrumdappApi.updateGroupCheckpoint();

type EditCheckpointModalProps = {
  state: ModalState;
  groupId: number;
  checkpoint: SessionCheckpointRow;
  onSaved?: () => void;
};

export default function EditCheckpointModal({
  state,
  groupId,
  checkpoint,
  onSaved,
}: EditCheckpointModalProps) {
  const { t } = useTranslation();

  const [presence, setPresence] = useState<string | null>(
    checkpoint.presence ?? null,
  );
  const [stars, setStars] = useState<number | null>(checkpoint.stars ?? null);
  const [notes, setNotes] = useState(checkpoint.comment ?? "");
  const [obstacle, setObstacle] = useState(checkpoint.impediment ?? "");

  const { runCommand, loading, error } = useApi(updateCheckpointProcessor);

  const handleApply = () => {
    if (!checkpoint) return;
    runCommand(groupId, {
      userId: checkpoint.groupUser,
      sessionId: checkpoint.sessionId,
      presence,
      stars,
      comment: notes,
      impediment: obstacle,
    })
      .then(() => {
        onSaved?.();
        state.close();
      })
      .catch((e) => {
        console.error(e);
      });
    state.close();
  };

  const userName = `${checkpoint.first_name} ${checkpoint.last_name}`;

  return (
    <Modal state={state}>
      <div className="space-y-5">
        <ModalHeadText>
          {t("checkpoint.modalheader", { name: userName })}
        </ModalHeadText>
        <div className="flex flex-col space-y-2 w-full">
          <label>{t("checkpoint.attendance")}</label>
          <AttendanceDropDownMenu value={presence} onChange={setPresence} />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="presence"
          />

          <label>{t("checkpoint.stars")}</label>
          <StarsInputField value={stars} onChange={setStars} />
          <FieldApiErrorMessage errors={error?.errors ?? null} field="stars" />

          <label>{t("checkpoint.notes")}</label>
          <input
            className="write-section"
            placeholder={t("checkpoint.notes")}
            value={notes}
            maxLength={2000}
            onChange={(e) => setNotes(e.target.value)}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="comment"
          />

          <label>{t("checkpoint.obstacle")}</label>
          <input
            className="write-section"
            placeholder={t("checkpoint.obstacle")}
            value={obstacle}
            maxLength={2000}
            onChange={(e) => setObstacle(e.target.value)}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="impediment"
          />
        </div>
        <ModalActionRow>
          <ModalCancelButton />
          <button
            className="btn border btn-secondary"
            onClick={handleApply}
            type="button"
            disabled={loading}
          >
            {loading ? t("action.saving") : t("action.apply")}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
