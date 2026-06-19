import {ModalState} from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {GroupCheckpointSession} from "../../js/models/checkpoint.ts";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {LoadScreen} from "../generic/LoadScreen.tsx";

export function CreateGroupCheckpointSessionModal({ groupId, state, onCreated }: { groupId: number, state: ModalState, onCreated?: (session: GroupCheckpointSession) => void }) {
    const [checkpointName, setCheckpointName] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const createCheckpointSession = useApi(ScrumdappApi.createCheckpointSessions());

    const handleCreate = async () => {
        if (!checkpointName.trim()) return;

        const session = await createCheckpointSession.runCommand(groupId, { name: checkpointName })

        onCreated?.(session)
        setCheckpointName("");
        state.accept();
    };

    return (
        <Modal state={state}>
            <div className="space-y-5">
                <ModalHeadText>New Checkpoint</ModalHeadText>
                <input
                    type="text"
                    className="write-section w-full!"
                    placeholder="Checkpoint Name"
                    alt="Checkpoint Name"
                    value={checkpointName}
                    maxLength={32}
                    onChange={(e) => {
                        setShowWarning(!/^[a-zA-Z0-9 \-]{1,32}$/.test(e.target.value))
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
                        disabled={!checkpointName.trim() || createCheckpointSession.loading}
                        onClick={handleCreate}
                    >
                        <FontAwesomeIcon icon={faCheck} className="icon"/>
                        {createCheckpointSession.loading ? (<LoadScreen />) : "Create"}
                    </button>
                </ModalActionRow>
            </div>
        </Modal>
    )
}