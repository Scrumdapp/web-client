import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import {toScrumdappDate} from "../../js/utils/scrumdappDate.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {useEffect} from "react";

const options = [
    { label: "---", color: "text-fg", value: null },
    { label: "0", color: "text-red-dim", value: 0 },
    { label: "0,5", color: "text-red", value: 1 },
    { label: "1", color: "text-orange-dim", value: 2 },
    { label: "1,5", color: "text-orange", value: 3 },
    { label: "2", color: "text-yellow-dim", value: 4 },
    { label: "2,5", color: "text-yellow", value: 5 },
    { label: "3", color: "text-green-dim", value: 6 },
    { label: "3,5", color: "text-green", value: 7 },
    { label: "4", color: "text-aqua-dim", value: 8 },
    { label: "4,5", color: "text-aqua", value: 9 },
    { label: "5", color: "text-blue", value: 10 }, { label: "---", color: "text-fg"},
    { label: "Present", color: "text-green"},
    { label: "Late", color: "text-orange"},
    { label: "Absent", color: "text-red"},
    { label: "Verified Absent", color: "text-aqua"},
    { label: "Online", color: "text-purple"},
    { label: "Sick", color: "text-blue"},

];

useEffect(() => {
    if (value !== undefined) {
        setLocalValue(value ?? null);
    }
}, [value]);

const resolvedValue = value !== undefined ? (value ?? null) : localValue;
const currentOption =
    options.find((opt) => opt.value === resolvedValue) ?? options[0];
const currentColor = currentOption.color || "text-fg";


function Checkin({ groupId }: {groupId: number, userId: number} ) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    console.log(GetGroupCheckinsComponent)


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
                            <td>{item.presence ?? "Unknown"} </td>
                            <td><Stars amount={item.checkin_stars}  /></td>
                            <td><Stars amount={item.checkin_stars} /></td>
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
