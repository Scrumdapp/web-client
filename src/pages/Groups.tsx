import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import {useState} from "react";

export default function Groups() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="app-container text-center">
            <button className="btn btn-red border" onClick={() => setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faPlus} className="icon text-blue" />New Group</button>
        {isModalOpen && (
        <CheckpointModal onClose={() => setIsModalOpen(false)} />
        )}
        </div>
    )
}

function CheckpointModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex fixed inset-0 backdrop-blur-lg justify-center items-center" onClick={() => onClose()}>
            <div className="bg-bg_h rounded-lg p-6 w-96 border" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-fg mb-4">New Group</h2>
                <input type="text"
                       placeholder="Group Name"
                       className="w-full p-2 rounded-lg mb-4 outline-none border"
                />
                <div className="flex items-center gap-2 justify-between">
                <button onClick={onClose} className="btn border">Cancel</button>
                <button onClick={onClose} className="btn border">Submit</button>
                </div>
            </div>

        </div>
    )
}