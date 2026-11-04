import Modal from "../generic/modal/Modal.tsx";
import { ModalState } from "../../js/hooks/useModalState.ts";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import { useTranslation } from "react-i18next";
import ChangelogV101 from "../changelog/v1_01.tsx";
import ChangelogV102 from "../changelog/v1_02.tsx";

export default function ChangeLogModal({ modal }: { modal: ModalState }) {
  const { t } = useTranslation();
  return (
    <Modal state={modal} className="mx-auto">
      <ModalHeadText>{t("changelogs.title")}</ModalHeadText>
      <div>
        <ChangelogV102 />
        <ChangelogV101 />
      </div>
      <ModalActionRow>
        <button onClick={modal.close} className="btn border">
          {t("changelogs.close")}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
