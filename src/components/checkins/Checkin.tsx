import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {getStarsColor, getAttendanceColor} from "./checkincomponents/CheckinColor.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function Checkin({groupId}: { groupId: number, userId: number }) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    const formatPresence = (val: string) => val?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    return <main className="lg:w-2xl md:w-xl sm:w-sm bg-bg border h-fit p-2 rounded-lg">
        <h2 className="text-fg text-2xl p-2 float-left font-bold">
            Check-in voor: <span className="text-fg">{toScrumdappDate(new Date())}</span>
        </h2>
        <GetGroupCheckinsComponent input={[groupId, toScrumdappDate(new Date()), {
            presence: true,
            checkin_stars: true,
            checkup_stars: true
        }]}>
            {checkin => (
                <table className="text-fg w-full text-xs md:text-xl lg:text-xl">

                    <thead>
                    <tr>
                        <th className="py-3 text-left pl-2">Name</th>
                        <th className="py-3 text-left pl-2">Attendance</th>
                        <th className="py-3">Check-in</th>
                        <th className="py-3">Check-up</th>
                        <th className="py-3 text-right pr-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkin.map(item => (
                        <tr key={item.user_id}>
                            <td className="py-3 text-left pl-2">{item.first_name} {item.last_name}</td>
                            <td className={`py-3 text-left pl-2 ${getAttendanceColor(formatPresence(item.presence ?? "---"))}`}>
                                {formatPresence(item.presence ?? "---")}
                            </td>
                            <td className={`px-3 ${getStarsColor(item.checkin_stars)}`}><Stars amount={item.checkin_stars}/></td>
                            <td className={`px-3 ${getStarsColor(item.checkup_stars)}`}><Stars amount={item.checkup_stars}/></td>
                            <td className="text-right pr-2">
                                <button className="btn btn-secondary border float-right my-2">More</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            )}
        </GetGroupCheckinsComponent>
        <div className="align-center horizontal gap-3 mt-2">
            <div className="flex-1"></div>
            <Link to="/scrummastercheckin" className="btn border m-auto mx-2"><FontAwesomeIcon icon={faPencil} className="icon text-blue" />Scrummaster Check-in</Link>
        </div>
    </main>

}

export default Checkin;
