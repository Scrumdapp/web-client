import {useParams} from "react-router-dom";
import {GroupProvider} from "../../js/context/group/GroupProvider.tsx";
import {GroupSidebar} from "./GroupSidebar.tsx";
import {groupContext} from "../../js/context/group/groupContext.ts";
import {GroupRouter} from "../../router/GroupRouter.tsx";
import {GroupSidebarDates} from "./GroupSidebarDates.tsx";
import {BackgroundOverride} from "../../js/context/background/BackgroundOverride.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export function GroupLayout() {
    const params = useParams()
    const groupId = parseInt(params.groupId ?? "nan")

    if (isNaN(groupId)) {
        return (
            <span>GroupLayout could not load the groupId params</span>
        )
    }
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    const handleClick = () => {
        setIsFavourite((prev) => !prev);
    }

    const GroupConsumer = groupContext.Consumer

    return (
        <GroupProvider groupId={groupId}>
            <div className="app-container vertical gap-4">
                <GroupConsumer>
                    {ctx => (<>
                        <BackgroundOverride background={ctx!!.group!!.background_preference ?? "1"} />
                        <div className="flex flex-1 w-full horizontal gap-4">
                            <h1> {ctx!!.group!!.name}</h1>
                            <button className="cursor-pointer" onClick={handleClick} aria-pressed={isFavourite}>
                                <h1> <FontAwesomeIcon icon={isFavourite ? faStarSolid : faStarRegular} /></h1>
                            </button>
                        </div>
                    </>)}
                </GroupConsumer>
                <div className="flex gap-4">
                    <div className="vertical gap-4">
                        <GroupSidebar/>
                        <GroupSidebarDates/>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <GroupRouter/>
                    </div>
                </div>
            </div>
        </GroupProvider>
    )
}