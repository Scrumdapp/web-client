import Modal from "./modal/Modal.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {useState} from "react";
import {CreateInvite} from "../../js/hooks/api/routes/inviteRoutes.tsx";

interface SettingsProps {
    groupId: number;
}

const EXPIRE_OPTIONS = [
    { label: "12 hours", hours: 12 },
    { label: "24 hours", hours: 24 },
    { label: "2 days", hours: 48 },
    { label: "3 days", hours: 72 },
    { label: "1 week", hours: 168 },
];

export default function Settings({ groupId }: SettingsProps) {
    const modal = useModalState();
    const [step, setStep] = useState<1 | 2>(1);
    const [password, setPassword] = useState("");
    const [expireHours, setExpireHours] = useState(12);
    const [generatedLink, setGeneratedLink] = useState("");
    const createInvite = CreateInvite();


    async function handleCreateInvite() {
        const expiresAt = new Date(Date.now() + expireHours * 60 * 60 * 1000);
        const invite = await createInvite(groupId, expiresAt, password);
        const link = `${window.location.origin}/invite/${invite.id}?token=${invite.token}`;
        setGeneratedLink(link);
        setStep(2);
    }

    function handleOpenModal() {
        setStep(1);
        modal.open();
    }

    function handleCurrentLink() {
        setStep(2);
        modal.open();
    }

    function handleDone() {
        modal.close();
        setStep(1);
    }
    return (
        <main>
            <div className="border rounded-2xl p-3 min-h-20">
                <div className="flex float-right gap-3">
                    <button onClick={handleCurrentLink} className="btn border">
                        Current Link
                    </button>
                    <button onClick={handleOpenModal} className="flex float-right btn btn-secondary border">
                        Create Invite
                    </button>
                </div>
                <div>
                    <h3>...All Invites</h3>
                </div>
            </div>
            <Modal state={modal}>
            {step === 1 && (
                <>
                <h1>Create a Password</h1>
                <input
                    className="write-section"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <select
                className="write-section"
                value={expireHours}
                onChange={e => setExpireHours(Number(e.target.value))}
                >
                {EXPIRE_OPTIONS.map(opt => (
                    <option key={opt.hours} value={opt.hours}>
                        {opt.label}
                    </option>
                ))}
                </select>
                <button onClick={handleCreateInvite} className="btn btn-secondary border">
                    Create
                </button>
                </>
            )}
            {step === 2 && (
                <>
                <div>
                    <h1>Invite others to group</h1>
                    <p>Copy and share the generated link with your team.</p>
                    <div className="py-5 flex flex-nowrap justify-between items-center">
                        <p>Link:</p>
                        <p>{generatedLink}</p>
                        <input className="write-section !w-7/10" />
                    </div>
                    <div className="flex flex-nowrap float-right space-x-3">
                        <button onClick={() => navigator.clipboard.writeText(generatedLink)} className="btn btn-secondary border">
                            Copy
                        </button>
                        <button onClick={handleDone} className="btn border">
                            Done
                        </button>
                    </div>
                </div>
                </>
                )}
            </Modal>
        </main>

    )
}
