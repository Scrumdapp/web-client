import Modal from "../../../generic/modal/Modal.tsx";
import {ModalState, useModalState} from "../../../../js/hooks/useModalState.ts";
import ModalHeadText from "../../../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../../generic/modal/components/ModalCancelButton.tsx";
import {useGroup} from "../../../../js/context/group/useGroup.ts";
import {Button} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import {useApi} from "../../../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../../../js/hooks/api/scrumdappApi.ts";
import {PatchGroup} from "../../../../js/models/group.ts";
import {BackgroundGrid} from "./BackgroundGrid.tsx";
import {BackgroundTopicNavbar} from "./BackgroundTopicNavbar.tsx";
import {StatusMessage, useStatusMessage} from "../../../../js/hooks/useStatusMessage.tsx";
import {useState} from "react";

const backgroundTopics: BackgroundTopic[] = [
    {id: 'All', backgrounds: ['1', '2', '4', '5', '6', '6_2', '7', '7_2', '8', '9', '10', '14', '14_2', '15', '17', '18', '22', '23', '30', 'color_aqua', 'color_bg', 'color_blue', 'color_gray', 'color_green', 'color_orange', 'color_purple', 'color_red']},
    {id: 'Landscapes', backgrounds: ['1', '4', '6_2', '7_2', '9', '10', '14_2', '22', '30']},
    {id: 'Cities', backgrounds: ['5', '6', '7', '8','15', '17']},
    {id: 'People', backgrounds: ['2', '4', '14']},
    {id: 'Colors', backgrounds: ['color_aqua', 'color_bg', 'color_blue', 'color_gray', 'color_green', 'color_orange', 'color_purple', 'color_red']},
    {id: 'Other', backgrounds: ['18', '23']},
]

export interface BackgroundTopic {
    id: string,
    backgrounds: string[]
}

export function BackgroundSelector() {

    const group = useGroup()
    const modalState = useModalState()

    return (
        <div className="card vertical gap-2">
            <h3>Background</h3>
            <p>Current background:</p>
            <img className="rounded-md w-1/2" src={`/backgrounds/thumbnails/${group.background_preference ? group.background_preference : 1}.webp`} alt="current background"/>
            <Button onClick={modalState.open} aria-label="change background" className="mr-auto btn border">
                <FontAwesomeIcon icon={faImages} className="text-green" />
                Change background
            </Button>

            <BackgroundSelectorModal modal={modalState}/>
        </div>
    )
}

function BackgroundSelectorModal({modal}: {modal: ModalState}){
    {
        const group = useGroup()

        const updateGroup = useApi(ScrumdappApi.updateGroup())

        const statusMessage = useStatusMessage()

        function handleGroupUpdate(backgroundId: string) {
            const patched: PatchGroup = {
                background_preference: backgroundId
            }
            updateGroup.runCommand(group.id, patched).then(() => {
                modal.close()
            })
                .catch(() => {
                    statusMessage.error("Something went wrong trying to apply the background")
                })
        }

        const [selectedTopic, setSelectedTopic] = useState<BackgroundTopic>(backgroundTopics[0])

        return (
            <Modal state={modal}>
                <ModalHeadText>Select background</ModalHeadText>
                <BackgroundTopicNavbar selectedTopicId={selectedTopic.id} handleSelected={setSelectedTopic} topics={backgroundTopics} />
                <BackgroundGrid backgrounds={selectedTopic.backgrounds} handleUpdate={handleGroupUpdate} />
                <ModalActionRow>
                    <StatusMessage status={statusMessage} />
                    <ModalCancelButton/>
                </ModalActionRow>
            </Modal>
        )
    }
}
