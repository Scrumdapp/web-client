import {useSearchParams} from "react-router-dom";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faCheck} from "@fortawesome/free-solid-svg-icons";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import {SessionsContainer} from "./SessionsContainer.tsx";
import {useGroup} from "../../js/context/group/useGroup.ts";
import {GroupUserProvider} from "../../js/context/groupUser/GroupUserProvider.tsx";
import {groupUserContext} from "../../js/context/groupUser/groupUserContext.ts";
import {useForm} from "./useForm.ts";
import {SessionStateProvider, useSessionState, useSessionStateContext} from "./UseSessionStateContext.tsx";
import {useApi} from "../../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {GroupCheckpointSessionCreate} from "../../js/models/checkpoint.ts";

export function CheckpointPage() {

    const [searchParams] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date());

    const group = useGroup();
    const sessionState = useSessionStateContext();


    const GroupUserConsumer = groupUserContext.Consumer

    return (
        <GroupUserProvider gId={group.id}>
            <GroupUserConsumer>
                {ctx => (
                    <SessionStateProvider state={sessionState}>
                        <div className="space-y-3">
                            <div className="card h-20 w-full flex justify-between">
                                <h2 className="px-2">{date}</h2>
                                <CreateSessionModal groupId={group.id} />
                            </div>
                            <div>
                                <SessionsContainer groupId={group.id} date={date} />
                            </div>
                        </div>
                    </SessionStateProvider>
                )}
            </GroupUserConsumer>
        </GroupUserProvider>
    )
}

function CreateSessionModal({groupId}: {
    groupId: number
}) {
    const modal = useModalState()
    const { refresh } = useSessionState()

    const createSession = useApi(ScrumdappApi.createCheckpointSessions())


    const emptyBody: GroupCheckpointSessionCreate = {
        name: ""
    }
    const {values, handleSubmit, handleChange} = useForm(emptyBody)

    const onSubmit = (body: GroupCheckpointSessionCreate) => {
        createSession.runCommand(groupId, body)
            .then(() => {
                console.log("created a checkin")
                refresh();
                modal.close();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <button className="btn border" onClick={modal.open}>
                <FontAwesomeIcon icon={faAdd} className="text-blue" />
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
                            <ModalCancelButton />
                            <button className="btn border" type="submit" >
                                <FontAwesomeIcon icon={faCheck} className="icon" />
                                Submit
                            </button>
                        </ModalActionRow>
                    </form>
                </div>
            </Modal>
        </>
    )
}