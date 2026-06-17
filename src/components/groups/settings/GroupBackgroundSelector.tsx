import Modal from "../../generic/modal/Modal.tsx";
import {useModalState} from "../../../js/hooks/useModalState.ts";
import ModalHeadText from "../../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../generic/modal/components/ModalCancelButton.tsx";
import {useCallback, useState} from "react";
import {useGroup} from "../../../js/context/group/useGroup.ts";
import {Button} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import {useApi} from "../../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../../js/hooks/api/scrumdappApi.ts";
import {PatchGroup} from "../../../js/models/group.ts";

interface backgroundTopic {
    id: string,
    backgrounds: string[]
}

function SectionSelector({ backgrounds }: {backgrounds: string[]}) {
    return (
        <div className="background-container grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            {backgrounds.map((i) => (
                <div className="relative aspect-4/3">
                    <img src={`/backgrounds/thumbnails/${i}.webp`} className="rounded-lg object-cover w-full h-full " alt="background"/>
                    <div className="absolute right-4 bottom-4">
                        <p>WASSUP</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function TopicNavbar({selectedTopicId, handleSelected, topics}: {
    selectedTopicId: string
    handleSelected: (topic: backgroundTopic) => void,
    topics: backgroundTopic[]
}) {

    return (
        <ul className="flex flex-row gap-2 border-b border-fg2">
            {topics.map(topic => (
                <li className='mt-2'>
                    <Button
                        className="btn"
                        onClick={() => handleSelected(topic)}
                    >{topic.id}</Button>
                </li>
            ))}
        </ul>
    )
}

export function BackgroundSelector() {

    const optionMap: backgroundTopic[] = [
        {id: 'test', backgrounds: ['1', '4', '6_2', '7_2', '9', '10', '14_2', '22', '30', '5', '6', '7', '8','15', '17']},
        {id: 'colors', backgrounds: ['color_aqua', 'color_bg', 'color_blue', 'color_gray', 'color_green', 'color_orange', 'color_purple', 'color_red']},
        {id: 'landscapes', backgrounds: ['1', '4', '6_2', '7_2', '9', '10', '14_2', '22', '30']},
        {id: 'cities', backgrounds: ['5', '6', '7', '8','15', '17']},
        {id: 'people', backgrounds: ['2', '4', '14']},
        {id: 'other', backgrounds: ['2', '18', '23']}
    ]

    const modalState = useModalState()
    const group = useGroup()

    const updateGroup = useApi(ScrumdappApi.updateGroup())

    const [selectedTopic, setSelectedTopic] = useState<backgroundTopic>(optionMap[0])

    const handleSetTopic = useCallback((topic: backgroundTopic) => {
        setSelectedTopic(topic)
    }, [selectedTopic])

    function handleGroupUpdate() {
        const patched: PatchGroup = {
            background_preference: '1'
        }
        updateGroup.runCommand(group.id, patched).then((data) => {
            
        })
    }

    return (
        <>
            <div className="card vertical gap-2">
                <h3>Background</h3>

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
                    <TopicNavbar selectedTopicId={selectedTopic} handleSelected={handleSetTopic} topics={optionMap} />
                    <SectionSelector backgrounds={selectedTopic.backgrounds} />
                </div>
                <ModalActionRow>
                    <ModalCancelButton/>
                </ModalActionRow>
            </Modal>
        </>


    )

}