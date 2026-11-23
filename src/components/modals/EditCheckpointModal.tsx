import { useId, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  const notesId = useId();
  const obstacleId = useId();
  const starsLabelId = useId();
  const { runCommand, loading, error } = useApi(updateCheckpointProcessor);
  const notesErrorId = `${notesId}-error`;
  const obstacleErrorId = `${obstacleId}-error`;
  const presenceErrorId = `${notesId}-presence-error`;
  const starsErrorId = `${notesId}-stars-error`;
  const hasPresenceError = error?.errors?.some(
    (field) => field.field === "presence",
  );
  const hasStarsError = error?.errors?.some((field) => field.field === "stars");
  const hasNotesError = error?.errors?.some(
    (field) => field.field === "comment",
  );
  const hasObstacleError = error?.errors?.some(
    (field) => field.field === "impediment",
  );

  const [presence, setPresence] = useState<string | null>(
    row?.presence ? String(row.presence) : null,
  );
  const [stars, setStars] = useState<number | null>(row?.stars ?? null);
  const [notes, setNotes] = useState(row?.comment ?? "");
  const [obstacle, setObstacle] = useState(row?.impediment ?? "");

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
          <AttendanceDropDownMenu
            label={t("checkpoint.attendance")}
            value={presence}
            onChange={setPresence}
            invalid={hasPresenceError}
            describedBy={hasPresenceError ? presenceErrorId : undefined}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="presence"
            id={presenceErrorId}
          />

          <label id={starsLabelId}>{t("checkpoint.stars")}</label>
          <StarsInputField
            value={stars}
            onChange={setStars}
            labelId={starsLabelId}
            describedBy={hasStarsError ? starsErrorId : undefined}
            invalid={hasStarsError}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="stars"
            id={starsErrorId}
          />

          <label htmlFor={notesId}>{t("checkpoint.notes")}</label>
          <input
            id={notesId}
            className="write-section"
            placeholder={t("checkpoint.notes")}
            value={notes}
            maxLength={2000}
            onChange={(e) => setNotes(e.target.value)}
            aria-invalid={hasNotesError || undefined}
            aria-describedby={hasNotesError ? notesErrorId : undefined}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="comment"
            id={notesErrorId}
          />

          <label htmlFor={obstacleId}>{t("checkpoint.obstacle")}</label>
          <input
            id={obstacleId}
            className="write-section"
            placeholder={t("checkpoint.obstacle")}
            value={obstacle}
            maxLength={2000}
            onChange={(e) => setObstacle(e.target.value)}
            aria-invalid={hasObstacleError || undefined}
            aria-describedby={hasObstacleError ? obstacleErrorId : undefined}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="impediment"
            id={obstacleErrorId}
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
            <FontAwesomeIcon
              icon={loading ? faSpinner : faCheck}
              spin={loading}
            />
            {loading ? t("checkpoint.saving") : t("checkpoint.apply")}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
