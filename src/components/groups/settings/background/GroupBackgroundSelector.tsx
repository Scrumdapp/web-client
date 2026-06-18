import Modal from "../../../generic/modal/Modal.tsx";
import {useModalState} from "../../../../js/hooks/useModalState.ts";
import ModalHeadText from "../../../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../../generic/modal/components/ModalCancelButton.tsx";
import {useState} from "react";
import {useGroup} from "../../../../js/context/group/useGroup.ts";
import {Button} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import {useApi} from "../../../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../../../js/hooks/api/scrumdappApi.ts";
import {PatchGroup} from "../../../../js/models/group.ts";
import useTempValue from "../../../../js/hooks/useTempValue.ts";
import {BackgroundGrid} from "./BackgroundGrid.tsx";
import {BackgroundTopicNavbar} from "./BackgroundTopicNavbar.tsx";

const backgroundTopics: BackgroundTopic[] = [

    {id: 'landscapes', backgrounds: ['1', '4', '6_2', '7_2', '9', '10', '14_2', '22', '30']},
    {id: 'cities', backgrounds: ['5', '6', '7', '8','15', '17']},
    {id: 'people', backgrounds: ['2', '4', '14']},
    {id: 'other', backgrounds: ['2', '18', '23']},
    {id: 'colors', backgrounds: ['color_aqua', 'color_bg', 'color_blue', 'color_gray', 'color_green', 'color_orange', 'color_purple', 'color_red']},
]
export interface BackgroundTopic {
    id: string,
    backgrounds: string[]
}

export function BackgroundSelector() {

    const group = useGroup()
    const modalState = useModalState()
    const statusMessage = useTempValue<string>()

    const [selectedTopic, setSelectedTopic] = useState<BackgroundTopic>(backgroundTopics[0])

    const updateGroup = useApi(ScrumdappApi.updateGroup())

    function handleGroupUpdate(backgroundId: string) {
        const patched: PatchGroup = {
            background_preference: backgroundId
        }
        updateGroup.runCommand(group.id, patched).then(() => {
            modalState.close()
            statusMessage.showContent("Background applied succesfully", 4000)
        })
        .catch(() => {
            modalState.close()
            statusMessage.showContent("Something went wrong whilst applying changes", 4000)
        })
    }

    return (
        <>
            <div className="card vertical gap-2">
                <h3>Background</h3>
                {statusMessage.visibility ? <p className="w-full border rounded-lg bg-orange-dim">{statusMessage.content}</p> : ''}
                <p>current background:</p>
                <img className="rounded-md w-1/2" src={`/backgrounds/thumbnails/${group.background_preference ? group.background_preference : 1}.webp`} alt="current background"/>

                <Button onClick={modalState.open} aria-label="change background" className="mr-auto btn border">
                    <FontAwesomeIcon icon={faImages} className="text-green" />
                    Change background
                </Button>
            </div>

            <Modal state={modalState}>
                <div className="vertical max-w-xl">
                    <ModalHeadText>Select background</ModalHeadText>
                    <BackgroundTopicNavbar selectedTopicId={selectedTopic.id} handleSelected={setSelectedTopic} topics={backgroundTopics} />
                    <BackgroundGrid backgrounds={selectedTopic.backgrounds} handleUpdate={handleGroupUpdate} />
                </div>
                <ModalActionRow>
                    <ModalCancelButton/>
                </ModalActionRow>
            </Modal>
        </>
    )

}