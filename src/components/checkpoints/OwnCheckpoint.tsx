import {useUser} from "../../js/context/user/useUser.ts";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCross, faPencil} from "@fortawesome/free-solid-svg-icons";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {GroupCheckpoint, UpdateGroupCheckpoint} from "../../js/models/checkpoint.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import {StarsDropDownMenu} from "../checkins/checkpointcomponents/StarsDropDownMenu.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import {useSessionState} from "./UseSessionStateContext.tsx";
import { useForm } from "./useForm.ts";


export default function OwnCheckpoint(sessionId: number, groupId: number, isLocked: boolean) {
    
    const user = useUser();
    const { refresh } = useSessionState()
    const modal = useModalState();

    const getCheckpoint = useApi(ScrumdappApi.getGroupCheckpoints());
    const updateCheckpoint = useApi(ScrumdappApi.updateGroupCheckpoint())

    const [checkpoint, setCheckpoint] = useState<GroupCheckpoint | null>(null)

    useEffect(() => {
        getCheckpoint.runCommand(groupId, sessionId, user.id);
        if (getCheckpoint.data != null) {
            setCheckpoint(getCheckpoint.data[0]);
        }
    }, [getCheckpoint.runCommand, groupId, sessionId, user.id]);


    const updatedFields: UpdateGroupCheckpoint = {
        userId: user.id,
        presence: checkpoint?.presence,
        impediment: checkpoint?.impediment,
        comment: checkpoint?.comment,
        stars: checkpoint?.stars,
    }
    const { handleChange, handleSubmit } = useForm(updatedFields)

    const onSubmit = (data: UpdateGroupCheckpoint) => {
        updateCheckpoint.runCommand(groupId, sessionId, data)
            .then(() => {
                    modal.close();
                    refresh();
                }
            )
            .catch(() => {

            })
    }

    if (isLocked) {
        return (
            <button
                disabled
                className="btn border m-auto mx-2 opacity-50 cursor-not-allowed!"
                title="Session has expired and cannot be altered"
            >
                <FontAwesomeIcon icon={faCross} className="icon text-blue" />
                Editing disabled
            </button>
        )
    }

    return (
        <>
            <button className="btn border" onClick={modal.open}>
                <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
                {checkpoint ? "Edit own checkpoint" : "Add own checkpoint"}
            </button>
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>{checkpoint ? "Edit checkpoint" : "Add checkpoint"}</ModalHeadText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 w-full">
                            {/*I don't know if this is going to work...*/}
                            <StarsDropDownMenu value={checkpoint?.stars} />

                            <label>Impediments:</label>
                            <input
                                className="write-section"
                                placeholder="Which tasks should be completed but have been delayed or haven't been completed yet?"
                                value={updatedFields?.impediment ?? ""}
                                onChange={handleChange("impediment")}
                            />

                            <label>Comment & other:</label>
                            <input
                                className="write-section"
                                placeholder="What's your plan for today?"
                                value={checkpoint?.comment ?? ""}
                            />
                        </div>

                        <ModalActionRow>
                            <ModalCancelButton />
                            <button type="submit">Submit</button>
                        </ModalActionRow>
                    </form>
                </div>
            </Modal>
        </>

    )
}