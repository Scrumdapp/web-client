import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import {
  AttendanceReadOnlyField,
  StarsReadOnlyField,
} from "../checkins/checkpointcomponents/ReadOnlyFields.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { SessionCheckpointRow } from "../../js/models/checkpoint.ts";
import { useTranslation } from "react-i18next";

type ReadOnlyCheckpointModalProps = {
  modal: ModalState;
  row: SessionCheckpointRow | null;
};

export default function ReadOnlyCheckpointModal({
  modal,
  row,
}: ReadOnlyCheckpointModalProps) {
  const { t } = useTranslation();

  const userName = row ? `${row.first_name} ${row.last_name}` : "";
  const presence = row?.presence ? String(row.presence) : null;
  const stars = row?.stars ?? 0;
  const notes = row?.comment ?? "";
  const obstacle = row?.impediment ?? "";

  return (
    <Modal state={modal} className="mx-auto max-w-xl">
      <div className="space-y-5">
        <ModalHeadText>
          {t("checkpoint.modalheaderreadonly", { name: userName })}
        </ModalHeadText>
        <div className="flex flex-col space-y-2 w-full">
          <div className="grid grid-cols-2 gap-x-8 space-y-2 w-full">
            <h3>{t("checkpoint.attendance")}</h3>
            <h3>{t("checkpoint.stars")}</h3>

            <AttendanceReadOnlyField value={presence} />
            <StarsReadOnlyField value={stars ?? 0} />
          </div>
          <h3 className="mt-2">{t("checkpoint.notes")}</h3>
          {notes.length > 0 ? (
            <p className="max-h-30 overflow-y-auto overflow-x-hidden break-words border-fg4 rounded-lg w-full">
              {notes}
            </p>
          ) : (
            <span className="text-fg4 italic">{t("checkpoint.nonotes")}</span>
          )}
          <h3 className="mt-2">{t("checkpoint.obstacle")}</h3>
          {obstacle.length > 0 ? (
            <p className="max-h-30 overflow-y-auto overflow-x-hidden break-words border-fg4 rounded-lg w-full">
              {obstacle}
            </p>
          ) : (
            <span className="text-fg4 italic">
              {t("checkpoint.noobstacles")}
            </span>
          )}
        </div>
        <ModalActionRow>
          <button
            className="btn border"
            onClick={() => modal.close()}
            type="button"
          >
            {t("checkpoint.modal.close")}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
