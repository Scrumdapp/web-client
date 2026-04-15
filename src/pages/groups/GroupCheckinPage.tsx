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

export function GroupCheckinPage() {
    const group = useGroup()
    const modal = useModalState()
    const [ searchParams ] = useSearchParams();
    const date = searchParams.get("date") ?? toScrumdappDate(new Date())

    const [checkpoints, setCheckpoints] = useState<string[]>([date]);

    const handleCreate = () => {
        setCheckpoints(prev => [...prev, date]);
        modal.accept();
    }
    return (
        <div className="space-y-3 ">
        <div className="flex justify-between card w-7/10 h-20 bg-bg_h border rounded-lg p-2 items-center">
            <h2 className="px-2">Checkpoint {date}</h2>
            <button className="btn border" onClick={modal.open}><FontAwesomeIcon icon={faAdd} className="text-blue"/> Create Checkpoint</button>
        </div>
            {checkpoints.map((checkpointDate, index) => (
                <Checkin key={index} groupId={group.id} date={checkpointDate} />
            ))}
            <Modal state={modal}>
                <div className="space-y-5">
                <ModalHeadText>New Checkpoint</ModalHeadText>
                <input className="write-section w-full!"></input>
                <ModalActionRow>
                    <ModalCancelButton />
                    <button className="btn btn-secondary border" onClick={handleCreate}>Create</button>
                </ModalActionRow>
                </div>
            </Modal>
        </div>

    )

}