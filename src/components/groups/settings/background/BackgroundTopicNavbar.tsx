import {BackgroundTopic} from "./GroupBackgroundSelector.tsx";
import {useTranslation} from "react-i18next";

export function BackgroundTopicNavbar({selectedTopicId, handleSelected, topics}: {
    selectedTopicId: string
    handleSelected: (topic: BackgroundTopic) => void,
    topics: BackgroundTopic[]
}) {
    const {t} = useTranslation();
    return (
        <ul className="flex flex-row gap-2 border-b border-fg2">
            {topics.map(topic => (
                <li key={topic.labelKey} className='my-2'>
                    <button
                        className={`btn ${selectedTopicId === topic.labelKey ? 'bg-bg3' : ''}`}
                        onClick={() => handleSelected(topic)}
                    >{t(topic.labelKey)}</button>
                </li>
            ))}
        </ul>
    )
}