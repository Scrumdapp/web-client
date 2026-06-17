import { useGroup } from "../../js/context/group/useGroup.ts";
import Checkpoint from "../../components/checkins/Checkpoint.tsx";
import { useSearchParams } from "react-router-dom";
import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { useUser } from "../../js/context/user/useUser.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { CreateGroupCheckpointSessionModal } from "../../components/modals/CreateGroupCheckpointSessionModal.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";

export function GroupCheckpointPage() {
    const group = useGroup();
    const modal = useModalState();
    const [searchParams] = useSearchParams();

    const currentDate = toScrumdappDate(new Date());
    const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const currentUser = useUser();

    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers(), {
        fetchOnCreated: [group.id]
    })
    const getCheckpointSessions = useApi(ScrumdappApi.getCheckpointSessions(), {
        fetchOnCreated: [group.id, { date }]
    });

    if (getGroupUsers.loading || getCheckpointSessions.loading) {
        return <LoadScreen />
    }

    if (getGroupUsers.error != null) {
        return <ErrorScreen error={getGroupUsers.error} />
    }

    if (getCheckpointSessions.error != null) {
        return <ErrorScreen error={getCheckpointSessions.error} />
    }

    const groupCreated = () => {
        getCheckpointSessions.runCommand(group.id, { date })
    }

    return (
        <div className="space-y-3 ">
            <div className="flex justify-between card w-full h-20 bg-bg_h border rounded-lg p-2 items-center">
                <h2 className="px-2">{date}</h2>
                <ShowIf condition={currentDate == date}>
                    <button className="btn border" onClick={modal.open}>
                        <FontAwesomeIcon icon={faAdd} className="text-blue" /> Create Checkpoint
                    </button>
                </ShowIf>
            </div>
            {getCheckpointSessions.data!.reverse().map((session, index) => (
                <div key={session.id} className="w-full">
                    <Checkpoint
                        groupId={group.id}
                        key={session.id}
                        name={session.name}
                        startTime={new Date(session.startTime).getTime()}
                        duration={session.duration * 60_000}
                        sessionId={session.id}
                        users={getGroupUsers.data!}
                        currentUser={currentUser}
                        ownerId={session.ownerId}
                        isMostRecent={index === 0}
                    />
                </div>
            ))}
            <CreateGroupCheckpointSessionModal groupId={group.id} state={modal} onCreated={groupCreated} />
        </div>
    );
}
