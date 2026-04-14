import Modal from "../components/generic/Modal.tsx";
import {useState} from "react";
import {faCheck, faPlus, faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Test() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div>
                <button className="btn border max-h-fit"
                        onClick={() => setIsModalOpen(true)}>
                    New Group <FontAwesomeIcon icon={faPlus} className="icon" /></button>
            </div>
            {isModalOpen && (
                <Modal
                    title="New Group"
                    onClose={() => setIsModalOpen(true)}
                    actions={
                        <>
                            <button onClick={() => setIsModalOpen(false)} className="btn border"><FontAwesomeIcon icon={faRotateLeft} className="text-gray icon" />Cancel</button>
                            <button onClick={() => setIsModalOpen(false)} className="btn border"><FontAwesomeIcon icon={faCheck} className="text-blue icon" />Submit</button>
                        </>
                    }
                >
                    <input
                        type="text"
                        placeholder="Group Name"
                        className="w-full p-2 rounded-lg mb-4 outline-none border"
                    />
                </Modal>)}
        </div>
    )
}


