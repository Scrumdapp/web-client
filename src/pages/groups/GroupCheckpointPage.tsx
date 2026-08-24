import { useMemo } from "react";
import { useGroup } from "../../js/context/group/useGroup.ts";
import Checkpoint from "../../components/checkins/Checkpoint.tsx";
import { Link, useSearchParams } from "react-router-dom";
import { parseScrumdappDate, toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { faAdd, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { CreateGroupCheckpointSessionModal } from "../../components/modals/CreateGroupCheckpointSessionModal.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";
import { parseWeekDay } from "../../js/utils/timeUtils.ts";
import { Group, GroupUser } from "../../js/models/group.ts";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { ModalState } from "../../js/hooks/useModalState.ts";

function shiftDate(date: string, offsetDays: number): string {
    const shifted = new Date(date);
    shifted.setDate(shifted.getDate() + offsetDays);
    return toScrumdappDate(shifted);
}

export function GroupCheckpointPage() {
    const group = useGroup();
    const modal = useModalState();
    const [searchParams] = useSearchParams();

    const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers(), {
        fetchOnCreated: [group.id],
    });
    const getCheckpointSessions = useApi(ScrumdappApi.getCheckpointSessions(), {
        fetchOnCreated: [group.id, { date }],
    });

    if (getGroupUsers.loading || getCheckpointSessions.loading) {
        return <LoadScreen />;
    }

    if (getGroupUsers.error != null) {
        return <ErrorScreen error={getGroupUsers.error} />;
    }

    if (getCheckpointSessions.error != null) {
        return <ErrorScreen error={getCheckpointSessions.error} />;
    }

    const refreshSessions = () => {
        getCheckpointSessions.runCommand(group.id, { date });
    };

    return (
        <GroupCheckpointView
            group={group}
            date={date}
            onSessionCreated={refreshSessions}
            checkpointSessions={getCheckpointSessions.data!}
            groupUsers={getGroupUsers.data!}
            modal={modal}
        />
    );
}

interface GroupCheckpointViewProps {
    group: Group;
    date: string;
    onSessionCreated: () => void;
    checkpointSessions: GroupCheckpointSession[];
    groupUsers: GroupUser[];
    modal: ModalState;
}

function GroupCheckpointView({
    group,
    date,
    onSessionCreated,
    checkpointSessions,
    groupUsers,
    modal,
    } : GroupCheckpointViewProps) {
    const currentDate = toScrumdappDate(new Date());
    const prevDate = shiftDate(date, -1);
    const nextDate = shiftDate(date, 1);
    const isToday = date === currentDate;

    const sessionsMostRecentFirst = useMemo(
        () => [...checkpointSessions].reverse(),
        [checkpointSessions]
    );

    return (
        <div className="space-y-3 ">
            <title>{group.name ? `${group.name} | Scrumdapp` : "Scrumdapp"}</title>
            <div className="flex justify-between card w-full h-20 bg-bg_h border rounded-lg p-2 items-center">
                <div className="horizontal items-center">
                    <Link to={`/groups/${group.id}?date=${prevDate}`} className="btn">
                        <FontAwesomeIcon icon={faChevronDown} className="rotate-90" />
                    </Link>
                    <h2 className="px-2">
                        {parseWeekDay(parseScrumdappDate(date).getUTCDay())} {date}
                    </h2>
                    <Link
                        to={`/groups/${group.id}?date=${nextDate}`}
                        className={`btn ${isToday ? "opacity-50 pointer-events-none" : ""}`}
                        aria-disabled={isToday}
                    >
                        <FontAwesomeIcon icon={faChevronDown} className="rotate-270" />
                    </Link>
                </div>
                <ShowIf condition={isToday}>
                    <button className="btn border" onClick={modal.open}>
                        <FontAwesomeIcon icon={faAdd} className="text-blue" /> Create Checkpoint
                    </button>
                </ShowIf>
            </div>
            {sessionsMostRecentFirst.map((session, index) => (
                <div key={session.id} className="w-full">
                    <Checkpoint
                        session={session}
                        users={groupUsers}
                        isMostRecent={index === 0}
                    />
                </div>
            ))}
            <CreateGroupCheckpointSessionModal groupId={group.id} state={modal} onCreated={onSessionCreated} />
        </div>
    );
}