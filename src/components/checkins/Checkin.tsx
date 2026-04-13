import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {getStarsColor, getAttendanceColor} from "../../js/utils/colorUtils.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {getformatPresence} from "../../js/utils/colorUtils.ts";

function Checkin({ groupId, date }: { groupId: number, date: string }) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())

    return <div className="card">
        <div className="flex justify-between">
        <h2 className="p-2 text-left">
            Check-in voor: <span className="text-fg">{date}</span>
        </h2>
            <button className="btn btn-secondary border">Create Checkpoint</button>
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
                        <th className="py-3 items-center">Check-in</th>
                        <th className="py-3 items-center">Check-up</th>
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
                            <td className={`p-3 ${getStarsColor(item.checkup_stars)}`}>
                                <div className="flex justify-center items-center">
                                    <Stars amount={item.checkup_stars}/>
                                </div>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            )}
        </GetGroupCheckinsComponent>
        <div className="align-center horizontal gap-3 mt-2">
            <div className="flex-1"></div>
            <Link to={`/groups/${groupId}/edit?date=${date}`} className="btn border m-auto mx-2"><FontAwesomeIcon icon={faPencil} className="icon text-blue" />Scrummaster Check-in</Link>
        </div>
    </div>
}

export default Checkin;
