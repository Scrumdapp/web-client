import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import { AttendanceDropDownMenu } from "../checkins/checkpointcomponents/AttendanceDropDownMenu.tsx";
import { FieldApiErrorMessage } from "../generic/FieldApiErrorMessage.tsx";
import { StarsInputField } from "../checkins/checkpointcomponents/StarsInputField.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../js/hooks/api/apiError.ts";

type EditCheckpointModalProps = {
  modal: ReturnType<typeof useModalState>;
  userName: string;
  presence: string | null;
  onPresenceChange: (v: string | null) => void;
  stars: number | null;
  onStarsChange: (v: number | null) => void;
  notes: string;
  onNotesChange: (v: string) => void;
  obstacle: string;
  onObstacleChange: (v: string) => void;
  error: ApiError | null;
  loading: boolean;
  onApply: () => void;
};

export default function EditCheckpointModal({
  modal,
  userName,
  presence,
  onPresenceChange,
  stars,
  onStarsChange,
  notes,
  onNotesChange,
  obstacle,
  onObstacleChange,
  error,
  loading,
  onApply,
}: EditCheckpointModalProps) {
  const { t } = useTranslation();

  return (
    <Modal state={modal} className="mx-auto">
      <div className="space-y-5">
        <ModalHeadText>
          {t("checkpoint.modalheader", { name: userName })}
        </ModalHeadText>
        <div className="flex flex-col space-y-2 w-full">
          <label>{t("checkpoint.attendance")}</label>
          <AttendanceDropDownMenu
            value={presence}
            onChange={onPresenceChange}
          />
          <FieldApiErrorMessage
            errors={error?.errors ?? null}
            field="presence"
          />

          <label>{t("checkpoint.stars")}</label>
          <StarsInputField value={stars} onChange={onStarsChange} />
          <FieldApiErrorMessage errors={error?.errors ?? null} field="stars" />

          <label>{t("checkpoint.notes")}</label>
          <input
            className="write-section"
            placeholder={t("checkpoint.notes")}
            value={notes}
            maxLength={2000}
            onChange={(e) => onNotesChange(e.target.value)}
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
            onChange={(e) => onObstacleChange(e.target.value)}
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
            onClick={onApply}
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
