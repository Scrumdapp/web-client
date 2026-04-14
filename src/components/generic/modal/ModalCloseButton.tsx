import * as React from "react"
import ModalContext from "./ModalContext"

export default function ModalCancelButton() {
    const modal = React.useContext(ModalContext)

    if (!modal) {
        throw new Error("ModalCloseButton must be used inside <Modal>")
    }

    return (
        <button onClick={modal.close} className="btn border">
            Cancel
        </button>
    )
}