import Modal from "../components/generic/modal/Modal.tsx";
import {useModalState} from "../js/hooks/useModalState.ts";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalHeadText from "../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../components/generic/modal/components/ModalCancelButton.tsx";
import {useState} from "react";

export default function Groups() {

    const modal = useModalState();
    const [name, setName] = useState("")

    return (
        <div className="app-container horizontal justify-between">
            <h2>Scrumdapp</h2>
            <button className="btn btn-red border max-h-fit"
                onClick={modal.open}>
                    New Group <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal state={modal}>
                <ModalHeadText>New Group</ModalHeadText>
                <form>
                    <input
                        type="text"
                        placeholder="Group Name"
                        className="write-section mb-4 w-full!"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </form>
                <ModalActionRow>
                    <ModalCancelButton/>
                    <button
                        onClick={modal.close}
                        disabled={!name}
                        className={`btn border ${!name ? "opacity-50 cursor-not-allowed!" : ""}`}
                    >
                        Submit
                    </button>
                </ModalActionRow>
            </Modal>
        </div>
    )
}