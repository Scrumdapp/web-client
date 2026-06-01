import Modal from "./modal/Modal.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {useState} from "react";
import {InviteResponse} from "../../js/models/invites.tsx";

interface SettingsProps {
    groupId: number;
}

export default function Settings({ groupId }: SettingsProps) {
    const modal = useModalState();
    const [step, setStep] = useState<1 | 2>(1);
    const [password, setPassword] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");

    async function handleCreateInvite() {
        const response = await fetch("/invites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupId, password })
        });

        const invite: InviteResponse = await response.json();

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
            {step === 1 && (
            <Modal state={modal}>
                <h1>Create a Password</h1>
                <input
                    className="write-section"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleCreateInvite} className="btn btn-secondary border">
                    Create
                </button>
            </Modal>
            )}
            {step === 2 && (
            <Modal state={modal}>
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
            </Modal>
            )}
        </main>

    )
}
