import Modal from "./modal/Modal.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import ModalActionRow from "./modal/components/ModalActionRow.tsx";
import ModalCancelButton from "./modal/components/ModalCancelButton.tsx";

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
    const createInvite = ScrumdappApi.CreateInvite();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

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

    function handleDone() {
        modal.close();
        setStep(1);
    }
    return (
        <main>
            <div className="card flex justify-between items-center">
                <h3>All Invites</h3>
                <button onClick={handleOpenModal} className="btn btn-secondary border">
                   Create Invite
                </button>
            </div>
            <Modal state={modal}>
                {step === 1 && (
                    <>
                        <h1>Create a Password</h1>
                        <div className="flex justify-between">
                            <input
                                className="write-section w-full! mr-2"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <select
                                className="text-center border rounded-lg outline-none"
                                value={expireHours}
                                onChange={e => setExpireHours(Number(e.target.value))}
                            >
                                {EXPIRE_OPTIONS.map(opt => (
                                    <option key={opt.hours} value={opt.hours}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ModalActionRow>
                            <div className="py-2 flex gap-x-2">
                            <ModalCancelButton />
                        <button onClick={handleCreateInvite} className="btn btn-secondary border">
                            Create
                        </button>
                            </div>
                        </ModalActionRow>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <h1>Invite others to group</h1>
                            <p>Copy and share the generated link with your team.</p>
                            <div className="py-5 flex flex-nowrap justify-between items-center">
                                <p>Link:</p>
                                <text className="write-section !w-7/10 overflow-hidden">{generatedLink}</text>
                            </div>
                            <ModalActionRow>
                                {copied && <p className="text-green-dim my-auto">Link copied to clipboard!</p>}
                                <button onClick={handleCopy} className="btn btn-secondary border">
                                    Copy link
                                </button>
                                <button onClick={handleDone} className="btn border">
                                    Done
                                </button>
                            </ModalActionRow>
                        </div>
                    </>
                )}
            </Modal>
        </main>

    )
}
