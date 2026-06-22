import {BackgroundTopic} from "./GroupBackgroundSelector.tsx";

export function BackgroundTopicNavbar({selectedTopicId, handleSelected, topics}: {
    selectedTopicId: string
    handleSelected: (topic: BackgroundTopic) => void,
    topics: BackgroundTopic[]
}) {

    return (
        <ul className="flex flex-row gap-2 border-b border-fg2">
            {topics.map(topic => (
                <li key={topic.id} className='my-2'>
                    <button
                        className={`btn ${selectedTopicId === topic.id ? 'bg-bg3' : ''}`}
                        onClick={() => handleSelected(topic)}
                    >{topic.id}</button>
                </li>
            ))}
        </ul>
    )
}