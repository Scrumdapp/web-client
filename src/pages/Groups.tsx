import Modal from "../components/generic/modal/Modal.tsx";
import {useModalState} from "../js/hooks/useModalState.ts";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalHeadText from "../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../components/generic/modal/components/ModalCancelButton.tsx";
import {useState} from "react";
import {LoadScreen} from "../components/generic/LoadScreen.tsx";
import {useApi} from "../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../js/hooks/api/scrumdappApi.ts";

export default function Groups() {

    const modal = useModalState();
    const [name, setName] = useState("")
    const createGroup = useApi(ScrumdappApi.createGroup());

    return (
        <div className="app-container horizontal justify-between">
            <h2>Scrumdapp</h2>
            <button className="btn btn-red border max-h-fit"
                onClick={modal.open}>
                    New Group <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal state={modal}>
                <ModalHeadText>New Group</ModalHeadText>
                <form id="create-group-form"
                    onSubmit={(e) => {e.preventDefault();

                        if (createGroup.loading) return;

                        createGroup
                            .runCommand({ name })
                            .then(() => {
                                modal.close();
                        });
                    }}>
                    <input
                        type="text"
                        placeholder="Group Name"
                        className="write-section mb-4 w-full!"
                        value={name}
                        maxLength="80" // Ignore error, shit just works fine, don't worry
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </form>
                <ModalActionRow>
                    <ModalCancelButton/>
                    <button
                        type="submit"
                        form="create-group-form"
                        disabled={!name}
                        className={`btn border ${!name ? "opacity-50 cursor-not-allowed!" : ""}`}
                    >
                        {createGroup.loading ? <LoadScreen /> : "Submit"}
                    </button>
                </ModalActionRow>
            </Modal>
        </div>
    )
}