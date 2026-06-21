import {useParams} from "react-router-dom";
import {GroupProvider} from "../../js/context/group/GroupProvider.tsx";
import {GroupSidebar} from "./GroupSidebar.tsx";
import {groupContext} from "../../js/context/group/groupContext.ts";
import {GroupRouter} from "../../router/GroupRouter.tsx";
import {GroupSidebarDates} from "./GroupSidebarDates.tsx";
import {BackgroundOverride} from "../../js/context/background/BackgroundOverride.tsx";

export function GroupLayout() {
    const params = useParams()
    const groupId = parseInt(params.groupId ?? "nan")

    if (isNaN(groupId)) {
        return (
            <span>GroupLayout could not load the groupId params</span>
        )
    }

    const GroupConsumer = groupContext.Consumer

    return (
        <GroupProvider groupId={groupId}>
            <div className="app-container vertical gap-4">
                <GroupConsumer>
                    {ctx => (<>
                        <BackgroundOverride background={ctx!!.group!!.background_preference ?? "1"} />
                        <h1> {ctx!!.group!!.name} </h1>
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