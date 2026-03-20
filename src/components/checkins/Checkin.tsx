import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {getStarsColor, getAttendanceColor} from "./checkincomponents/CheckinColor.tsx";


function Checkin({ groupId }: {groupId: number, userId: number} ) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    console.log(GetGroupCheckinsComponent)
    const formatPresence = (val: string) =>
        val?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    return <main className="w-6/10 bg-bg border h-fit p-2 rounded-lg">




                <GetGroupCheckinsComponent input={[groupId, toScrumdappDate(new Date()), {
                    presence: true,
                    checkin_stars: true,
                    checkup_stars: true
                }]} >
                    {checkin => (
                <table className="text-fg w-full table-fixed">
                    <thead>
                    <tr>
                        <th className="py-3">Name</th>
                        <th className="py-3">Attendance</th>
                        <th className="py-3">Check-in</th>
                        <th className="py-3">Check-up</th>
                        <th className="py-3">More Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkin.map(item => (
                        <tr key={item.user_id} >
                            <td className="py-3">{item.first_name} {item.last_name}</td>
                            <td className={`py-3 ${getAttendanceColor(formatPresence(item.presence))}`}>
                                {formatPresence(item.presence) ?? "---"}
                            </td>
                            <td className={getStarsColor(item.checkin_stars)}><Stars amount={item.checkin_stars}  /></td>
                            <td className={getStarsColor(item.checkup_stars)}><Stars amount={item.checkup_stars}/></td>
                            <td className="flex justify-center">
                                <button className="btn btn-secondary border">More</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
                    )}
            </GetGroupCheckinsComponent>
    </main>
}

export default Checkin;
