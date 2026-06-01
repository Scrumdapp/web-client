import Modal from "./modal/Modal.tsx";
import {useModalState} from "../../js/hooks/useModalState.ts";
import {useState} from "react";

export default function Settings() {
    const modal = useModalState();
    const [step, setStep] = useState<1 | 2>(1);

    function handleOpenModal() {
        setStep(1);
        modal.open();
    }

    function handleCreatePassword() {
        setStep(2);
    }

    function handleDone() {
        modal.close();
        setStep(1);
    }
    return (
        <main>
            <div className="flex flex-col border">
                <div>
                    <button onClick={handleOpenModal} className="flex float-right btn btn-secondary border">
                        Create Invite
                    </button>
                </div>
                <div>
                    ...All Invites
                </div>
            </div>
            {step === 1 && (
            <Modal state={modal}>
                <h1>Create a Password</h1>
                <input className="write-section"/>
                <button onClick={handleCreatePassword} className="btn btn-secondary border">
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
                        <input className="write-section !w-7/10" />
                    </div>
                    <div className="flex flex-nowrap float-right space-x-3">
                        <button className="btn btn-secondary border">
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
