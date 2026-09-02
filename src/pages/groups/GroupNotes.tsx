import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/generic/modal/Modal.tsx";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";

export function GroupNotes() {

    return (
        <div className="vertical gap-4">
            <title>Settings | Scrumdapp</title>
            <div className="card">
                <h2 className="mb-4">Group Notes</h2>
                <input type="text" className="write-section w-full mb-4"/>
                <div className="horizontal justify-end">
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-secondary"><FontAwesomeIcon icon={faPen} /> Edit</button>
                </div>
            </div>
            <Modal state={state}>
                <ModalHeadText>Edit Notes</ModalHeadText>
            </Modal>
        </div>
    )
}