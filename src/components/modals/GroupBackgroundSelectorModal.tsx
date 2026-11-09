import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import { BackgroundTopicNavbar } from "../groups/settings/background/BackgroundTopicNavbar.tsx";
import { BackgroundGrid } from "../groups/settings/background/BackgroundGrid.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import {
  StatusMessage,
  useStatusMessage,
} from "../../js/hooks/useStatusMessage.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { useTranslation } from "react-i18next";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { useState } from "react";
import { PatchGroup } from "../../js/models/group.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { useGroup } from "../../js/context/group/useGroup.ts";

const backgroundTopics: BackgroundTopic[] = [
  {
    labelKey: "settings.background.modal.subjects.all",
    backgrounds: [
      "1",
      "2",
      "4",
      "5",
      "6",
      "6_2",
      "7",
      "7_2",
      "8",
      "9",
      "10",
      "14",
      "14_2",
      "15",
      "17",
      "18",
      "22",
      "23",
      "30",
      "color_aqua",
      "color_bg",
      "color_blue",
      "color_gray",
      "color_green",
      "color_orange",
      "color_purple",
      "color_red",
    ],
  },
  {
    labelKey: "settings.background.modal.subjects.landscapes",
    backgrounds: ["1", "4", "6_2", "7_2", "9", "10", "14_2", "22", "30"],
  },
  {
    labelKey: "settings.background.modal.subjects.cities",
    backgrounds: ["5", "6", "7", "8", "15", "17"],
  },
  {
    labelKey: "settings.background.modal.subjects.people",
    backgrounds: ["2", "4", "14"],
  },
  {
    labelKey: "settings.background.modal.subjects.colors",
    backgrounds: [
      "color_aqua",
      "color_bg",
      "color_blue",
      "color_gray",
      "color_green",
      "color_orange",
      "color_purple",
      "color_red",
    ],
  },
  {
    labelKey: "settings.background.modal.subjects.other",
    backgrounds: ["18", "23"],
  },
];

export interface BackgroundTopic {
  labelKey: string;
  backgrounds: string[];
}

type GroupBackgroundSelectorModalProps = {
  modal: ModalState;
};

export default function GroupBackgroundSelectorModal({
  modal,
}: GroupBackgroundSelectorModalProps) {
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<BackgroundTopic>(
    backgroundTopics[0],
  );
  const group = useGroup();

  const updateGroup = useApi(ScrumdappApi.updateGroup());

  const statusMessage = useStatusMessage();
  function handleGroupUpdate(backgroundId: string) {
    const patched: PatchGroup = {
      background_preference: backgroundId,
    };
    updateGroup
      .runCommand(group.id, patched)
      .then(() => {
        modal.close();
      })
      .catch(() => {
        statusMessage.error(
          "Something went wrong trying to apply the background",
        );
      });
  }
  return (
    <Modal
      state={modal}
      className="w-[calc(100vw-2rem)] md:w-fit max-w-full mx-auto my-4"
    >
      <ModalHeadText>{t("settings.background.modal.select")}</ModalHeadText>
      <BackgroundTopicNavbar
        selectedTopicId={t(selectedTopic.labelKey)}
        handleSelected={setSelectedTopic}
        topics={backgroundTopics}
      />
      <BackgroundGrid
        backgrounds={selectedTopic.backgrounds}
        handleUpdate={handleGroupUpdate}
      />
      <ModalActionRow>
        <StatusMessage status={statusMessage} />
        <ModalCancelButton />
      </ModalActionRow>
    </Modal>
  );
}
