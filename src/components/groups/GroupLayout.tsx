import {useParams} from "react-router-dom";
import {GroupProvider} from "../../js/context/group/GroupProvider.tsx";

export function GroupLayout() {
    const params = useParams()
    const groupId = parseInt(params.groupId ?? "nan")

    if (isNaN(groupId)) {
        return (
            <span>GroupLayout could not load the groupId params</span>
        )
    }

    return (
        <GroupProvider groupId={groupId}>
            <div className="flex h-full">
                <div></div>
                <div></div>
            </div>
        </GroupProvider>
    )
}