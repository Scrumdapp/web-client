import Modal from "./modal/Modal.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import ModalActionRow from "./modal/components/ModalActionRow.tsx";
import ModalCancelButton from "./modal/components/ModalCancelButton.tsx";
import {TimeDurationDropdownMenu} from "./TimeDuration.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faCopy} from "@fortawesome/free-regular-svg-icons";

interface SettingsProps {
    groupId: number;
}

export default function Settings({ groupId }: SettingsProps) {
    const modal = useModalState();
    const [step, setStep] = useState<1 | 2>(1);
    const [password, setPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [expireHours] = useState(12);
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
        const link = `${window.location.origin}/invites/${invite.id}?token=${invite.token}`;
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
                        <div className="flex justify-between py-2">
                            <input
                                className="write-section w-full! mr-2 flex-[5]"
                                placeholder="Password"
                                value={password}
                                maxLength={32}
                                onChange={(e) => {
                                    setShowWarning(!/^[a-zA-Z0-9 ]{1,24}$/.test(e.target.value))
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                            <div className="flex flex-[3]">
                                <TimeDurationDropdownMenu />
                            </div>
                        </div>
                        <ModalActionRow>
                            <div className="py-2 flex gap-x-2">
                                {showWarning && (
                                    <p className="text-red text-sm">
                                        Only letters, numbers and spaces are allowed.
                                    </p>
                                )}
                                <ModalCancelButton />
                                <button onClick={handleCreateInvite} className={`btn btn-secondary border ${!password ? "opacity-50 cursor-not-allowed!" : ""}`}
                                        disabled={!password.trim()}
                                >
                                    <FontAwesomeIcon icon={faCheck} /> Create
                                </button>
                            </div>
                        </ModalActionRow>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <h1>Invite others to group</h1>
                            <p>Copy and share this generated link with your team.</p>
                            <div className="py-5 flex flex-nowrap justify-between items-center">
                                <p>Link:</p>
                                <text className="write-section p-2! !w-7/10 overflow-hidden">{generatedLink}</text>
                            </div>
                            <ModalActionRow>
                                <button onClick={handleCopy} className="btn btn-secondary border">
                                    <FontAwesomeIcon icon={faCopy} /> Copy link
                                </button>
                                <button onClick={handleDone} className="btn border">
                                    <FontAwesomeIcon icon={faCheck} /> Done
                                </button>
                            </ModalActionRow>
                            {copied && <p className="text-right text-green-dim mt-2">Link copied to clipboard!</p>}
                        </div>
                    </>
                )}
            </Modal>
        </main>

    )
}
