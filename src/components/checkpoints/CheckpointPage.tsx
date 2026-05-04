import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faCheck} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import {useState} from "react";
import {Sessions} from "./Sessions.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {GroupUserProvider} from "../../js/context/groupUser/GroupUserProvider.tsx";
import {groupUserContext} from "../../js/context/groupUser/groupUserContext.ts";

export function CheckpointPage() {

    const [searchParams] = useSearchParams()
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())
    const group = useGroup()

    const GroupUserConsumer = groupUserContext.Consumer

    return (
        <GroupUserProvider gId={group.id}>
            <GroupUserConsumer>
                {ctx => (
                    <div className="space-y-3">
                        <div className="card h-20 w-full flex justify-between">
                            <h2 className="px-2">{date}</h2>
                            <CreateSessionModal />
                        </div>
                        <div>
                            <Sessions groupId={group.id} date={date} />
                        </div>
                    </div>
                )}
            </GroupUserConsumer>
        </GroupUserProvider>
    )
}

function CreateSessionModal() {
    const modal = useModalState()

    const [sessionName, setSessionName] = useState<string | null>(null)

    return (
        <>
            <button className="btn border" onClick={modal.open}>
                <FontAwesomeIcon icon={faAdd} className="text-blue" />
                Create Session
            </button>
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>Create new Session</ModalHeadText>
                    <input
                        className="write-section w-full!"
                        placeholder="Session name"
                        value="meh"
                        maxLength={30}
                        onChange={(h) => setSessionName(h.target.value)}
                        required
                    />
                    <ModalActionRow>
                        <ModalCancelButton />
                        <button
                            className=""
                            disabled={!sessionName}
                        >
                            <FontAwesomeIcon icon={faCheck} className="icon" />
                        </button>
                    </ModalActionRow>
                </div>
            </Modal>
        </>
    )
}