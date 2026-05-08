import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {SessionsContainer} from "../checkpoints/SessionsContainer.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {GroupUserProvider} from "../../js/context/groupUser/GroupUserProvider.tsx";
import {useSessionState} from "../../js/hooks/sessions/useSessionState.ts";
import {SessionStateProvider} from "../../js/context/sessions/SessionStateProvider.tsx";
import {CreateSessionModal} from "../checkpoints/CreateSessionModal.tsx";

export function SessionLayout() {

    const [searchParams] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const group = useGroup();
    const sessionState = useSessionState();

    return (
        <GroupUserProvider gId={group.id}>
            <SessionStateProvider state={sessionState}>
                <div className="space-y-3">
                    <div className="card h-20 w-full flex justify-between">
                        <h2 className="px-2">{date}</h2>
                        <CreateSessionModal groupId={group.id} />
                    </div>
                    <div>
                        <SessionsContainer groupId={group.id} date={date} />
                    </div>
                </div>
            </SessionStateProvider>
        </GroupUserProvider>
    )
}

