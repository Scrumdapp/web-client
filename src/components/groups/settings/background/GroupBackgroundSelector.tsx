import {
  ModalState,
  useModalState,
} from "../../../../js/hooks/useModalState.ts";
import { useGroup } from "../../../../js/context/group/useGroup.ts";
import { Button } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import GroupBackgroundSelectorModal from "../../../modals/GroupBackgroundSelectorModal.tsx";

export interface BackgroundTopic {
  labelKey: string;
  backgrounds: string[];
}

export function BackgroundSelector() {
  const { t } = useTranslation();
  const group = useGroup();
  const modalState = useModalState();

  return (
    <div className="card vertical gap-2">
      <h3>{t("settings.background.header")}</h3>
      <p>{t("settings.background.text")}</p>
      <img
        className="rounded-md w-1/2 max-w-full"
        src={`/backgrounds/thumbnails/${group.background_preference ? group.background_preference : 1}.webp`}
        alt={t("settings.background.current")}
      />
      <Button
        onClick={modalState.open}
        aria-label={t("settings.background.change")}
        className="mr-auto btn border"
      >
        <FontAwesomeIcon icon={faImages} className="text-green" />
        {t("settings.background.change")}
      </Button>

      <BackgroundSelectorModal modal={modalState} />
    </div>
  );
}

function BackgroundSelectorModal({ modal }: { modal: ModalState }) {
  {
    return <GroupBackgroundSelectorModal modal={modal} />;
  }
}
