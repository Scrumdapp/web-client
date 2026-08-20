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
import { useUser } from "../../js/context/user/useUser.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { CreateGroupCheckpointSessionModal } from "../../components/modals/CreateGroupCheckpointSessionModal.tsx";
import { ShowIf } from "../../components/utility/Conditional.tsx";
import { parseWeekDay } from "../../js/utils/timeUtils.ts";
import { Group, GroupUser } from "../../js/models/group.ts";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { User } from "../../js/models/user.ts";
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

    const currentDate = toScrumdappDate(new Date());
    const date = searchParams.get("date") ?? currentDate;

    const prevDate = shiftDate(date, -1);
    const nextDate = shiftDate(date, 1);

    const currentUser = useUser();

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

    const groupCreated = () => {
        getCheckpointSessions.runCommand(group.id, { date });
    };

    return (
        <GroupCheckpointView
            group={group}
            date={date}
            prevDate={prevDate}
            nextDate={nextDate}
            currentDate={currentDate}
            groupCreated={groupCreated}
            checkpointSessions={getCheckpointSessions.data!}
            groupUsers={getGroupUsers.data!}
            currentUser={currentUser}
            modal={modal}
        />
    );
}

function GroupCheckpointView({
                                 group,
                                 date,
                                 prevDate,
                                 nextDate,
                                 currentDate,
                                 groupCreated,
                                 checkpointSessions,
                                 groupUsers,
                                 currentUser,
                                 modal,
                             }: {
    group: Group;
    date: string;
    prevDate: string;
    nextDate: string;
    currentDate: string;
    groupCreated: () => void;
    checkpointSessions: GroupCheckpointSession[];
    groupUsers: GroupUser[];
    currentUser: User;
    modal: ModalState;
}) {

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
                        className={`btn ${date === currentDate ? "opacity-50 pointer-events-none" : ""}`}
                        aria-disabled={date === currentDate}
                    >
                        <FontAwesomeIcon icon={faChevronDown} className="rotate-270" />
                    </Link>
                </div>
                <ShowIf condition={currentDate == date}>
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
                        currentUser={currentUser}
                        isMostRecent={index === 0}
                    />
                </div>
            ))}
            <CreateGroupCheckpointSessionModal groupId={group.id} state={modal} onCreated={groupCreated} />
        </div>
    );
}