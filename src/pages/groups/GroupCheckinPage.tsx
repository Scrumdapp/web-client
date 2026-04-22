import {useGroup} from "../../js/context/group/useGroup.ts";
import Checkin from "../../components/checkins/Checkin.tsx";
import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import Modal from "../../components/generic/modal/Modal.tsx";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import type {GroupCheckpointSession, PartialGroupCheckpoint} from "../../js/models/checkpoint.ts";

const getCheckpointSessions = ScrumdappApi.getCheckpointSessions();
const getGroupCheckpointsBySession = ScrumdappApi.getGroupCheckpointsBySession();
const createCheckpointSession = ScrumdappApi.createCheckpointSession();

type SessionWithCheckpoint = {
    session: GroupCheckpointSession;
    checkpointSession: GroupCheckpointSession;
}

export function GroupCheckinPage() {
    const group = useGroup()
    const modal = useModalState()
    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())

    const [sessionsWithCheckpoints, setSessionsWithCheckpoints] = useState<SessionWithCheckpoints[]>([]);
    const [sessionName, setSessionName] = useState("");


    const handleCreate = async () => {
        if (!checkpointName.trim()) return;

        const created = await ScrumdappApi.createCheckpointSessions()(group.id, {
            name: checkpointName.trim(),
        });

        setCheckpoints(prev => [...prev, {
            id: created.id,
            date,
            name: checkpointName.trim(),
            startTime: Date.now(),
            sessionId: created.id
        }]);
        setCheckpointName("");
        modal.accept();
    }



    return (
        <div className="space-y-3 ">
        <div className="flex justify-between card w-7/10 h-20 bg-bg_h border rounded-lg p-2 items-center">
            <h2 className="px-2">{date}</h2>
            <button className="btn border" onClick={modal.open}><FontAwesomeIcon icon={faAdd} className="text-blue"/> Create Session</button>
        </div>
            {checkpoints.map((checkpoint) => (
                <div key={checkpoint.id} className="w-full">
                    <Checkin
                        groupId={group.id }
                        date={checkpoint.date}
                        key={checkpoint.id}
                        name={checkpoint.name}
                        startTime={checkpoint.startTime}
                        sessionId={checkpoint.sessionId}
                    />
                </div>

            ))}
            <Modal state={modal}>
                <div className="space-y-5">
                <ModalHeadText>New Session</ModalHeadText>
                <input className="write-section w-full!" placeholder="Session Name" onChange={(e) => setCheckpointName(e.target.value)}></input>
                <ModalActionRow>
                    <ModalCancelButton />
                    <button className="btn btn-secondary border" onClick={handleCreate}>Create</button>
                </ModalActionRow>
                </div>
            </Modal>
        </div>

    )

}