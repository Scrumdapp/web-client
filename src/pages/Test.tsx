import Modal from "../components/generic/modal/Modal.tsx"
import ModalCancelButton from "../components/generic/modal/ModalCloseButton.tsx"
import {useModalState} from "../js/hooks/useModalState.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ModalHeadText from "../components/generic/modal/ModalHeadText.tsx";
import ModalTextField from "../components/generic/modal/ModalTextField.tsx";
import ModalButtonRow from "../components/generic/modal/ModalButtonRow.tsx";


export default function Test() {
    const modal = useModalState()

    return (
        <div>
            <button onClick={modal.open} className="btn btn-red border">
                New Group <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal state={modal}>
                <ModalHeadText>New Group</ModalHeadText>
                <ModalTextField>New Group</ModalTextField>
                <ModalButtonRow>
                    <ModalCancelButton />
                    <button onClick={modal.close} className="btn border">Submit</button>
                    <button onClick={modal.close} className="btn border">Delete</button>

                </ModalButtonRow>
            </Modal>
        </div>
    )
}