import {useGroup} from "../../js/context/group/useGroup.ts";
import Checkpoint from "../../components/checkins/Checkpoint.tsx";
import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import Modal from "../../components/generic/modal/Modal.tsx";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {faAdd, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {LoadScreen} from "../../components/generic/LoadScreen.tsx";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {useUser} from "../../js/context/user/useUser.ts";
import {ErrorScreen} from "../../components/generic/ErrorScreen.tsx";

function parseStartTime(sessionDate: string, sessionStartTime: string) {
    const parsed = new Date(`${sessionDate}T${sessionStartTime}`).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
}

export function GroupCheckpointPage() {
    const group = useGroup();
    const modal = useModalState();
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const currentUser = useUser();

    const updateGroupCheckpoints = useApi(ScrumdappApi.updateGroupCheckpoints());
    const getGroupUsers = useApi(ScrumdappApi.getGroupUsers(), {
        fetchOnCreated: [ group.id ]
    })
    const getCheckpointSessions = useApi(ScrumdappApi.getCheckpointSessions(), {
        fetchOnCreated: [ group.id, { date } ]
    });

    const [checkpointName, setCheckpointName] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    const handleCreate = async () => {
        if (!checkpointName.trim()) return;

        await ScrumdappApi.createCheckpointSessions()(group.id, {
            name: checkpointName.trim(),
        });

        getCheckpointSessions.runCommand(group.id, { date })
        setCheckpointName("");
        modal.accept();
    };

    if (getGroupUsers.loading || getCheckpointSessions.loading) {
        return <LoadScreen />
    }

    if (getGroupUsers.error != null) {
        return <ErrorScreen error={getGroupUsers.error} />
    }

    if (getCheckpointSessions.error != null) {
        return <ErrorScreen error={getCheckpointSessions.error} />
    }

    return (
        <div className="space-y-3 ">
            <div className="flex justify-between card w-full h-20 bg-bg_h border rounded-lg p-2 items-center">
                <h2 className="px-2">{date}</h2>
                <button className="btn border" onClick={modal.open}>
                    <FontAwesomeIcon icon={faAdd} className="text-blue"/> Create Checkpoint
                </button>
            </div>
            {getCheckpointSessions.data!.reverse().map((session) => (
                <div key={session.id} className="w-full">
                    <Checkpoint
                        groupId={group.id}
                        date={session.date}
                        key={session.id}
                        name={session.name}
                        startTime={parseStartTime(session.date, session.startTime)}
                        duration={session.duration * 60_000}
                        sessionId={session.id}
                        users={getGroupUsers.data!}
                        currentUser={currentUser}
                        ownerId={session.ownerId}
                    />
                </div>
            ))}
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>New Session</ModalHeadText>
                    <input
                        type="text"
                        className="write-section w-full!"
                        placeholder="Session Name"
                        value={checkpointName}
                        maxLength={32}
                        onChange={(e) => {
                            setShowWarning(!/^[a-zA-Z0-9 ]{1,24}$/.test(e.target.value))
                            setCheckpointName(e.target.value);
                        }}
                        required
                    />
                    {showWarning && (
                        <p className="text-red text-sm">
                            Only letters, numbers and spaces are allowed.
                        </p>
                    )}
                    <ModalActionRow>
                        <ModalCancelButton/>
                        <button
                            className={`btn btn-secondary border ${!checkpointName ? "opacity-50 cursor-not-allowed!" : ""}`}
                            disabled={!checkpointName}
                            onClick={handleCreate}
                        >
                            <FontAwesomeIcon icon={faCheck} className="icon"/>
                            {updateGroupCheckpoints.loading || updateGroupCheckpoints.loading ? (
                                <LoadScreen/>
                            ) : (
                                "Create"
                            )}
                        </button>
                    </ModalActionRow>
                </div>
            </Modal>
        </div>
    );
}