import * as React from "react"
import ModalContext from "./ModalContext.tsx"
import {faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ModalCancelButton() {
    const modal = React.useContext(ModalContext)

    if (!modal) {
        throw new Error("ModalCloseButton must be used inside <Modal>")
    }

    return (
        <button onClick={modal.close} className="btn border">
            <FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />
            Cancel
        </button>
    )
}