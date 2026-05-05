import {useUser} from "../../js/context/user/useUser.ts";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCross, faPencil} from "@fortawesome/free-solid-svg-icons";
import {useModalState} from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import {useSessionState} from "./UseSessionStateContext.tsx";
import { useForm } from "./useForm.ts";
import {UpdateGroupCheckpoint} from "../../js/models/checkpoint.ts";
import {getStarsColor, starsOptions} from "../../js/utils/colorUtils.ts";

export default function OwnCheckpoint({sessionId, groupId, isLocked}: {
    sessionId: number,
    groupId: number,
    isLocked: boolean
}) {
    
    const user = useUser();
    const { refreshCheckpoints, refresh, refreshCheckpointsKey } = useSessionState()
    const modal = useModalState();

    const getCheckpoint = useApi(ScrumdappApi.getGroupCheckpoints());
    const updateCheckpoint = useApi(ScrumdappApi.updateGroupCheckpoint())

    const emptyCheckpoint: UpdateGroupCheckpoint = {
        userId: user.id,
        presence: "",
        impediment: "",
        comment: "",
        stars: 0,
    };

    const { values, setValues, handleChange, handleSubmit } = useForm(emptyCheckpoint);

    useEffect(() => {
        if (isLocked) return
        if (refreshCheckpointsKey > 0 && refreshCheckpointsKey != sessionId) return

        getCheckpoint.runCommand(groupId, sessionId, user.id).then(r => {
            const field = r[0];
            const updatedFields: UpdateGroupCheckpoint = {
                userId: user.id,
                presence: field.presence,
                impediment: field.impediment,
                comment: field.comment,
                stars: field.stars,
            };
            setValues(updatedFields);
        });
    }, [getCheckpoint.runCommand, groupId, sessionId, user.id, refresh]);

    const onSubmit = (data: UpdateGroupCheckpoint) => {

        // TODO("Actually give something back and handle errors ):")
        updateCheckpoint.runCommand(groupId, sessionId, data)
            .then(() => {
                refresh();
                refreshCheckpoints(sessionId);
                modal.close();
            })
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
            <button className="btn border" onClick={modal.open}>
                <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
                {values ? "Edit own checkpoint" : "Add own checkpoint"}
            </button>
            <Modal state={modal}>
                <div className="space-y-5">
                    <ModalHeadText>{values ? "Edit checkpoint" : "Add checkpoint"}</ModalHeadText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 mb-3 w-full">
                            <label>Stars:</label>
                            <NewStarsDropdown value={values?.stars} handleChange={handleChange} />

                            <label>Impediments:</label>
                            <textarea
                                className="write-section"
                                placeholder="Which tasks should be completed but have been delayed or haven't been completed yet?"
                                defaultValue={values?.impediment ?? ""}
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
