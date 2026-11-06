import { useEffect } from "react";
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

const STORAGE_KEY = "seenChangelogs";

const CHANGELOGS = [
  { versionId: "1.02", ChangelogComponent: ChangelogV102 },
  { versionId: "1.01", ChangelogComponent: ChangelogV101 },
];

const CHANGELOG_IDS = CHANGELOGS.map((c) => c.versionId);

function readSeen(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSeen(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

function listsDiffer(a: string[] | null, b: string[]) {
  if (!Array.isArray(a)) return true;
  return a.length !== b.length || a.some((id, i) => id !== b[i]);
}

export default function ChangeLogModal({ modal }: { modal: ModalState }) {
  const { t } = useTranslation();

  useEffect(() => {
    const seen = readSeen();
    if (listsDiffer(seen, CHANGELOG_IDS)) {
      modal.open();
      writeSeen(CHANGELOG_IDS);
    }
  }, []);

  return (
    <Modal state={modal} className="mx-auto flex max-h-[90vh] flex-col">
      <ModalHeadText>{t("changelogs.title")}</ModalHeadText>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 focus:outline-none mb-2">
        {CHANGELOGS.map(({ versionId, ChangelogComponent }, i) => (
          <div key={versionId}>
            {i > 0 && <hr className="my-2 text-gray" />}
            <ChangelogComponent />
          </div>
        ))}
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
