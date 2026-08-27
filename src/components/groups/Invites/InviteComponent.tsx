import Modal from "../../generic/modal/Modal.tsx";
import {useModalState} from "../../../js/hooks/useModalState.ts";
import {useEffect, useState} from "react";
import {ScrumdappApi} from "../../../js/hooks/api/scrumdappApi.ts";
import ModalActionRow from "../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../generic/modal/components/ModalCancelButton.tsx";
import {TimeDurationDropdownMenu} from "../../generic/TimeDuration.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {useApi} from "../../../js/hooks/api/useApi.ts";
import {InviteResponse} from "../../../js/models/invites.tsx";
import useTempState from "../../../js/hooks/useTempState.ts";
import {Trans} from "react-i18next";

interface InvitesProps {
    groupId: number;
}

export default function Invites({ groupId }: InvitesProps) {
    const modal = useModalState();
    const [step, setStep] = useState<1 | 2>(1);
    const [password, setPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [expireHours] = useState(12);
    const [generatedLink, setGeneratedLink] = useState("");
    const createInvite = useApi(ScrumdappApi.CreateInvite());
    const getGroupInvites = useApi(ScrumdappApi.GetGroupInvites());
    const [invites, setInvites] = useState<InviteResponse[]>([]);

    const [copied, setCopied] = useTempState(false);
    const [copiedId, setCopiedId] = useTempState<number>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
    };


    const handleCopyInvite = (invite: InviteResponse) => {
        const link = `${window.location.origin}/invites/${invite.id}?token=${invite.token}`;
        navigator.clipboard.writeText(link);
        setCopiedId(invite.id);
    };

    useEffect(() => {
        getGroupInvites.runCommand(groupId).then(setInvites);
    }, [groupId]);

    async function handleCreateInvite() {
        const expiresAt = new Date(Date.now() + expireHours * 60 * 60 * 1000);
        const invite = await createInvite.runCommand(groupId, expiresAt, password);
        const link = `${window.location.origin}/invites/${invite.id}?token=${invite.token}`;
        setGeneratedLink(link);
        setStep(2);

        const result = await getGroupInvites.runCommand(groupId);
        setInvites(result);
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
        <>
            <div className="card flex flex-col items-center">
                <div className="flex flex-row w-full justify-between items-center py-3">
                    <h3>
                        <Trans i18nKey="invite.header">All Invites</Trans>
                    </h3>
                    <button onClick={handleOpenModal} className="btn btn-secondary border">
                        <Trans i18nKey="invite.create">Create Invite</Trans>
                    </button>
                </div>
                <div className="w-full">
                    {invites.length === 0 ? (
                        <p>
                            <Trans i18nKey="invite.noinvites">No active invites.</Trans>
                        </p>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="p-2 text-left">
                                        <Trans i18nKey="invite.expire">Expires at</Trans>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invites.map((invite) => {
                                    const expired = new Date(invite.expiresAt) < new Date();
                                    return (
                                        <tr key={invite.id}>
                                            <td className="p-2">{new Date(invite.expiresAt).toLocaleString()}</td>
                                            <td>
                                                <button onClick={() => handleCopyInvite(invite)}
                                                    className={`btn btn-secondary border my-1 float-right ${expired? "opacity-50 cursor-not-allowed!" : ""}`}
                                                    disabled={expired}>
                                                    <FontAwesomeIcon icon={copiedId === invite.id ? faCheck : faCopy}/>
                                                    {copiedId === invite.id ? " Copied!" : expired ? <Trans i18nKey="invite.expired">Expired</Trans> : <Trans i18nKey="invite.modal.copy">Copy link</Trans>}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Modal state={modal}>
                {step === 1 && (
                    <>
                        <h1>Create a Password</h1>
                        <div className="flex justify-between py-2">
                            <input
                                className="write-section w-full! mr-2 flex-5"
                                placeholder="Password"
                                alt="Password"
                                value={password}
                                maxLength={32}
                                onChange={(e) => {
                                    setShowWarning(!/^[a-zA-Z0-9 !@#$%^&]{1,32}$/.test(e.target.value))
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                            <div className="flex flex-3">
                                <TimeDurationDropdownMenu />
                            </div>
                        </div>
                        <ModalActionRow>
                            <div className="py-2 flex gap-x-2">
                                {showWarning && (
                                    <p className="text-red text-sm">
                                        <Trans i18nKey="invite.modal.error">Only letters, numbers and spaces and !@#$%^& are allowed.</Trans>
                                    </p>
                                )}
                                <ModalCancelButton />
                                <button onClick={handleCreateInvite} className={`btn btn-secondary border ${!password ? "opacity-50 cursor-not-allowed!" : ""}`}
                                        disabled={!password.trim()}
                                >
                                    <FontAwesomeIcon icon={faCheck} /> <Trans i18nKey="invite.modal.create">Create</Trans>
                                </button>
                            </div>
                        </ModalActionRow>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <h1>
                                <Trans i18nKey="invite.modal.header">Invite others to group.</Trans>
                            </h1>
                            <p>
                                <Trans i18nKey="invite.modal.text">Copy and share this generated link with your team.</Trans>
                            </p>
                            <div className="py-5 gap-2 flex flex-nowrap justify-between items-center">
                                <p>
                                    <Trans i18nKey="invite.modal.link">Link:</Trans>
                                </p>
                                <text className="write-section p-2! overflow-hidden">{generatedLink}</text>
                            </div>
                            <ModalActionRow>
                                <button onClick={handleCopy} className="btn btn-secondary border">
                                    <FontAwesomeIcon icon={faCopy} /> <Trans i18nKey="invite.modal.copy">Copy link</Trans>
                                </button>
                                <button onClick={handleDone} className="btn border">
                                    <FontAwesomeIcon icon={faCheck} /> <Trans i18nKey="invite.modal.done">Done</Trans>
                                </button>
                            </ModalActionRow>
                            {copied && <p className="text-right text-green-dim mt-2"><Trans i18nKey="invite.modal.succes">Link copied to clipboard!</Trans></p>}
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}