import * as React from "react"
import ModalContext from "./ModalContext.tsx"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function ModalCancelButton() {
    const {t} = useTranslation();
    const modal = React.useContext(ModalContext)

    if (!modal) {
        throw new Error("ModalCloseButton must be used inside <Modal>")
    }

    return (
        <button onClick={modal.close} className="btn border">
            <FontAwesomeIcon icon={faRotateLeft} className="text-gray" />
            {t("modal.cancel")}
        </button>
    )
}