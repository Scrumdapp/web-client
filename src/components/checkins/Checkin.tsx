import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import Stars from "./checkincomponents/Stars.tsx";
import {getStarsColor, getAttendanceColor} from "../../js/utils/colorUtils.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {getformatPresence} from "../../js/utils/colorUtils.ts";
import {useEffect} from "react";
import {useState} from "react";
import Modal from "../../components/generic/modal/Modal.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import ModalHeadText from "../../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../components/generic/modal/components/ModalCancelButton.tsx";
import {StarsDropDownMenu} from "./checkincomponents/StarsDropDownMenu.tsx";

function Checkin({ groupId, date, name, startTime, sessionId }: { groupId: number, date: string, name: string, startTime: number, sessionId: number }) {
    const GetGroupCheckinsComponent = useApiComponent(ScrumdappApi.getGroupCheckinsWithUsers())
    const modal = useModalState();

    const DURATION_MS = 15 * 60 * 1000;

    const [timeLeft, setTimeLeft] = useState(() => {
        const expiresAt = startTime + DURATION_MS;
        return Math.max(0, expiresAt - Date.now());
    });

    const isLocked = timeLeft <= 0;

    const [notes, setNotes] = useState("");
    const [selectedStar, setSelectedStar] = useState<number | null>(null);

    const [myUserId, setMyUserId] = useState<number | null>(null);
    useEffect(() => {
        ScrumdappApi.getCurrentUser()().then(user => setMyUserId(user.id))
    }, []);

    useEffect(() => {
        if (isLocked) return;

        const interval = setInterval(() => {
            const expiresAt = startTime + DURATION_MS;
            const remaining = Math.max(0, expiresAt - Date.now());
            setTimeLeft(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, isLocked]);

    const handleApply = async () => {
        if (myUserId === null) return;
        await ScrumdappApi.updateGroupCheckpoint()(groupId, sessionId, {
            userId: myUserId,
            stars: selectedStar,
            comment: notes
        });

        setNotes("");
        setSelectedStar(null);
        modal.close();
    };

    return <div className="card w-7/10 space-x-5">
        <h2>{name}</h2>
        <hr className="my-2" />
        <p className="text-sm">
            {isLocked ? "Check-in closed" : `Closes in ${Math.floor(timeLeft / 60000)}:${String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')}`}
        </p>
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
        <div className="align-center horizontal gap-3 mt-2 justify-end">
            <Link to={`/groups/${groupId}/edit?date=${date}`} className="btn border m-auto mx-2"><FontAwesomeIcon icon={faPencil} className="icon text-blue" />Scrummaster Checkpoint</Link>
            <button className="btn border" onClick={modal.open}><FontAwesomeIcon icon={faPencil} className="icon text-blue"/>Change Checkpoint</button>
        </div>
        <Modal state={modal}>
            <div className="space-y-5">
                <ModalHeadText>Change Checkpoint</ModalHeadText>
                    <div className="flex flex-col space-y-2 w-full">
                    <input
                       className="write-section"
                       placeholder="Notes"
                       value={notes}
                       onChange={(e) => setNotes(e.target.value)}
                       required
                    />
                    <StarsDropDownMenu
                        value={selectedStar}
                        onChange={setSelectedStar}
                    />
                    </div>
                    <ModalActionRow>
                    <ModalCancelButton />
                        <button
                            className={`btn border ${!notes && selectedStar === null ? "forbidden" : ""}`}
                            disabled={!notes && selectedStar === null}
                            onClick={handleApply}
                        >
                        Apply
                        </button>

                    </ModalActionRow>
            </div>
        </Modal>
    </div>
}

export default Checkin;
