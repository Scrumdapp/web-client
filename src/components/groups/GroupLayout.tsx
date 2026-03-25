import {useParams} from "react-router-dom";
import {GroupProvider} from "../../js/context/group/GroupProvider.tsx";
import {GroupSidebar} from "./GroupSidebar.tsx";
import {groupContext} from "../../js/context/group/groupContext.ts";

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
            <GroupConsumer>
                {ctx => (
                    <div className="h-full app-container">
                        <h1> {ctx?.group.name} </h1>
                        <div className="flex flex-1">
                            <div className="flex flex-col gap-2">
                                <GroupSidebar />
                                <div className="card">
                                    <p>Today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GroupConsumer>
        </GroupProvider>
    )
}