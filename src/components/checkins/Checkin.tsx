import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {getStarsColor, getAttendanceColor} from "../../js/utils/colorUtils.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons"
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getformatPresence} from "../../js/utils/colorUtils.ts";
import {useState} from "react";

function Checkin({groupId, date}: { groupId: number, date: string }) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <div className="card w-fit space-x-5">
        <div className="flex justify-between w-full">
            <h2 className="p-2 text-left">
                Check-in voor: <span className="text-fg">{date}</span>
            </h2>
            <button className="btn border max-h-fit"
                    onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faAdd} className="icon text-blue"/>Create Checkpoint
            </button>
        </div>
        <GetGroupCheckinsComponent input={[groupId, date, {
            presence: true,
            checkin_stars: true,
            checkup_stars: true
        }]}>
            {checkin => (
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="py-3 text-left pl-2">Name</th>
                        <th className="py-3 text-left pl-2">Attendance</th>
                        <th className="py-3 items-center">How're you feeling?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkin.map(item => (
                        <tr key={item.user_id}>
                            <td className="py-3 text-left pl-2 name-field">{item.first_name} {item.last_name}</td>
                            <td className={`py-3 text-left pl-2 ${getAttendanceColor(getformatPresence(item.presence ?? "---"))}`}>
                                {getformatPresence(item.presence ?? "---")}
                            </td>
                            <td className={`p-3 ${getStarsColor(item.checkin_stars)}`}>
                                <div className="flex justify-center items-center">
                                    <Stars amount={item.checkin_stars}/>
                                </div>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            )}
        </GetGroupCheckinsComponent>
        <div className="align-center horizontal gap-3 mt-2">
            <div className="flex-1"></div>
            <Link to={`/groups/${groupId}/edit?date=${date}`} className="btn border m-auto mx-2"><FontAwesomeIcon
                icon={faPencil} className="icon text-blue"/>Scrummaster Check-in</Link>
        </div>
        {isModalOpen && (
            <CheckpointModal onClose={() => setIsModalOpen(false)}/>
        )}
    </div>
}

function CheckpointModal({onClose, onConfirm}:
     {
         onClose: () => void,
         onConfirm: (name: string) => void,
     }) {
    const [name, setName] = useState("");

    return (
        <div className="flex fixed inset-0 backdrop-blur-lg justify-center items-center" onClick={() => onClose()}>
            <div className="bg-bg_h rounded-lg p-6 w-96 border" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-fg mb-4">New Checkpoint:</h2>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"
                       placeholder="Name:"
                       className="w-full p-3 rounded-lg mb-4 outline-none border"
                />
                <div className="flex justify-between">
                    <button onClick={() => onConfirm(name)} className="btn border">Confirm</button>
                    <button onClick={onClose} className="btn border btn-red">Close</button>
                </div>
            </div>

        </div>
    )
}

export default Checkin;
