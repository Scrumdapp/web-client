import {useModalState} from "../../js/hooks/useModalState.ts";
import {useSessionState} from "../../js/context/sessions/useSessionState.ts";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {GroupCheckpointSessionCreate} from "../../js/models/checkpoint.ts";
import {useForm} from "../../js/hooks/useForm.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faCheck} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";

export function CreateSessionModal({groupId}: {
    groupId: number
}) {
    const modal = useModalState();
    const {invalidate} = useSessionState();

    const createSession = useApi(ScrumdappApi.createCheckpointSessions());

    const emptyBody: GroupCheckpointSessionCreate = {
        name: ""
    };

    const {values, handleSubmit, handleChange} = useForm(emptyBody);

    const onSubmit = (body: GroupCheckpointSessionCreate) => {
        createSession.runCommand(groupId, body)
            .then(() => {
                invalidate([
                    {type: "sessions"}
                ]);
                modal.close();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <button className="btn border" onClick={modal.open}>
                <FontAwesomeIcon icon={faAdd} className="text-blue"/>
                Create Session
            </button>
            <Modal state={modal}>
                <div className="space-y-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeadText>Create new Session</ModalHeadText>
                        <input
                            className="write-section w-full!"
                            placeholder="Session name"
                            value={values.name}
                            maxLength={30}
                            onChange={handleChange("name")}
                            required
                        />
                        <ModalActionRow>
                            <ModalCancelButton/>
                            <button className="btn border" type="submit">
                                <FontAwesomeIcon icon={faCheck} className="icon"/>
                                Submit
                            </button>
                        </ModalActionRow>
                    </form>
                </div>
            </Modal>
        </>
    )
}