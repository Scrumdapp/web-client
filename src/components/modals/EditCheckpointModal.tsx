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
import {
  GroupCheckpoint,
  SessionCheckpointRow,
} from "../../js/models/checkpoint.ts";

const updateCheckpointProcessor = ScrumdappApi.updateGroupCheckpoint();

type EditCheckpointModalProps = {
  modal: ModalState;
  groupId: number;
  row: SessionCheckpointRow | null;
  onSaved: (
    patch: Pick<
      GroupCheckpoint,
      "groupUser" | "presence" | "stars" | "comment" | "impediment"
    >,
  ) => void;
};

export default function EditCheckpointModal({
  modal,
  groupId,
  row,
  onSaved,
}: EditCheckpointModalProps) {
  const { t } = useTranslation();

  const [presence, setPresence] = useState<string | null>(
    row?.presence ? String(row.presence) : null,
  );
  const [stars, setStars] = useState<number | null>(row?.stars ?? null);
  const [notes, setNotes] = useState(row?.comment ?? "");
  const [obstacle, setObstacle] = useState(row?.impediment ?? "");

  const { runCommand, loading, error } = useApi(updateCheckpointProcessor);

  const handleApply = async () => {
    if (!row) return;
    try {
      await runCommand(groupId, {
        userId: row.groupUser,
        sessionId: row.sessionId,
        presence,
        stars,
        comment: notes,
        impediment: obstacle,
      });
      onSaved({
        groupUser: row.groupUser,
        presence,
        stars,
        comment: notes,
        impediment: obstacle,
      });
      modal.close();
    } catch (e) {
      console.error(e);
    }
  };

  const userName = row ? `${row.first_name} ${row.last_name}` : "";

  return (
    <Modal state={modal}>
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
            {loading ? t("checkpoint.saving") : t("checkpoint.apply")}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
