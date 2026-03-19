import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import StarsDropDownMenu from "./checkincomponents/StarsDropDownMenu.tsx";
import {timelineItem} from "@material-tailwind/react";



function Checkin({ groupId }: {groupId: number, userId: number} ) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    const today = new Date().toISOString().split("T")[0];


    return <main className="w-6/10 bg-bg border h-fit p-2 rounded-lg">

                <GetGroupCheckinsComponent input={[groupId, today]}>
                    {checkin =>
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
                        <tr key={item.user_id} {...item.presence?}>
                            <td className="py-3">{user.last_name} {user.last_name}</td>
                            <td>{checkin.map(item.presence) ?? "Unknown"}</td>
                            <td><StarsDropDownMenu /></td>
                            <td><StarsDropDownMenu /></td>
                            <td className="flex justify-center">
                                <button className="btn btn-secondary border">More</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            }
            </GetGroupCheckinsComponent>
    </main>
}

export default Checkin;
