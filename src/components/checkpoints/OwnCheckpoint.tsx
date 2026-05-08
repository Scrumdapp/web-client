import {useUser} from "../../js/context/user/useUser.ts";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {useEffect, useMemo, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCross, faPencil} from "@fortawesome/free-solid-svg-icons";
import {useModalState} from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { useForm } from "../../js/hooks/useForm.ts";
import {GroupCheckpointSession, UpdateGroupCheckpoint} from "../../js/models/checkpoint.ts";
import {getStarsColor, starsOptions} from "../../js/utils/colorUtils.ts";
import {calculateExpiryTime} from "../../js/utils/timeUtils.ts";
import {useSessionStateContext} from "../../js/context/sessions/useSessionStateContext.ts";

export default function OwnCheckpoint({session, groupId, lock}: {
    session: GroupCheckpointSession,
    groupId: number,
    lock: boolean
}) {
    
    const user = useUser();
    const modal = useModalState();
    const { invalidate, useInvalidation } = useSessionStateContext();

    const sessionVersion = useInvalidation({type: "session", id: session.id});

    const getCheckpoint = useApi(ScrumdappApi.getGroupCheckpoints());
    const updateCheckpoint = useApi(ScrumdappApi.updateGroupCheckpoint())

    const [isLocked, setIsLocked] = useState(lock);
    const [isEmpty, setIsEmpty] = useState(true);

    const emptyCheckpoint = useMemo<UpdateGroupCheckpoint>(() => ({
        userId: user.id,
        presence: "",
        impediment: "",
        comment: "",
        stars: 0,
    }), [user.id]);

    const { values, setValues, handleChange, handleSubmit } = useForm(emptyCheckpoint);

    useEffect(() => {
        if (isLocked) return;
        if (getCheckpoint.loading) return;

        getCheckpoint.runCommand(groupId, session.id, user.id).then(r => {
            const field = r[0];
            if (field == undefined) {
                setIsEmpty(true);
            } else {
                const updatedFields: UpdateGroupCheckpoint = {
                    userId: user.id,
                    presence: field?.presence,
                    impediment: field?.impediment,
                    comment: field?.comment,
                    stars: field?.stars,
                };
                setValues(updatedFields);
                setIsEmpty(false);
            }
        });
    }, [sessionVersion, getCheckpoint.runCommand, groupId, session.id]);
    
    const onModalOpen = () => {
        if (calculateExpiryTime(session) <= 0) {
            setIsLocked(true);
        } else {
            modal.open();
        }
    }

    const onSubmit = (data: UpdateGroupCheckpoint) => {
        updateCheckpoint.runCommand(groupId, session.id, data)
            .then(() => {
                invalidate([
                    { type: "session", id: session.id},
                    { type: "checkpoints", sessionId: session.id}
                ]);
                modal.close();
            })
            // TODO("Actually give something back and handle errors ):")
            .catch(() => {

            });
    };

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
            <button className="btn border" onClick={onModalOpen}>
                <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
                {!isEmpty ? "Edit own checkpoint" : "Add own checkpoint"}
            </button>
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>{!isEmpty ? "Edit checkpoint" : "Add checkpoint"}</ModalHeadText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 mb-3 w-full">
                            <label>Stars:</label>
                            <NewStarsDropdown value={values?.stars} handleChange={handleChange} />

                            <label>Impediments:</label>
                            <textarea
                                className="write-section"
                                placeholder="Which tasks should be completed but have been delayed or haven't been completed yet?"
                                value={values?.impediment ?? ""}
                                onChange={handleChange("impediment")}
                            />

                            <label>Comment & other:</label>
                            <textarea
                                className="write-section"
                                placeholder="What's your plan for today?"
                                value={values?.comment ?? ""}
                                onChange={handleChange("comment")}
                            />
                        </div>

                        <ModalActionRow>
                            <ModalCancelButton />
                            <button className="btn border" type="submit">Submit</button>
                        </ModalActionRow>
                    </form>
                </div>
            </Modal>
        </>

    )
}

function NewStarsDropdown({value, handleChange}:{
    value: number | undefined | null,
    handleChange: any
}) {
    const currentColor = getStarsColor(value);

    return (
        <select
            value={String(value)}
            onChange={handleChange("stars")}
            className={`btn-attendance border cursor-pointer text-left ${currentColor}`}
        >
            {starsOptions.map((opt) => (
                <option
                    key={opt.value}
                    value={String(opt.value)}
                    className={`btn-attendance-dropdown ${opt.color}`}
                >{opt.label}</option>
            ))}
        </select>
    )
}
