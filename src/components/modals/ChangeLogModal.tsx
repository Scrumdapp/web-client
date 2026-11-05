import Modal from "../generic/modal/Modal.tsx";
import { ModalState } from "../../js/hooks/useModalState.ts";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import { useTranslation } from "react-i18next";
import ChangelogV101 from "../changelog/v1_01.tsx";
import ChangelogV102 from "../changelog/v1_02.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faHandSparkles,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";

export default function ChangeLogModal({ modal }: { modal: ModalState }) {
  const { t } = useTranslation();
  return (
    <Modal state={modal} className="mx-auto flex max-h-[90vh] flex-col">
      <ModalHeadText>{t("changelogs.title")}</ModalHeadText>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 focus:outline-none mb-2">
        <ChangelogV102 />
        <hr className="my-2 text-gray" />
        <ChangelogV101 />
      </div>
      <ModalActionRow>
        <div className="flex horizontal gap-4 my-auto mr-auto">
          <div>
            <FontAwesomeIcon icon={faPlus} className="text-green" />
            {t("changelogs.feature")}
          </div>
          <div>
            <FontAwesomeIcon icon={faHandSparkles} className="text-yellow" />
            {t("changelogs.enrichment")}
          </div>
          <div>
            <FontAwesomeIcon icon={faBug} className="text-red" />
            {t("changelogs.bugfix")}
          </div>
        </div>
        <button onClick={modal.close} className="btn border">
          {t("changelogs.close")}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
