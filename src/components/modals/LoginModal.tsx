import { ModalState } from "../../js/hooks/useModalState";
import Modal from "../generic/modal/Modal";
import { WebConfig } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import { useUserState } from "../../js/context/user/useUser";

export function LoginModal({ state }: { state: ModalState }) {
    const userState = useUserState()

    // Unfortunately, there is no other way to handle the request
    const handleLogin = () => {
        if (import.meta.env.DEV) {
            fetch(WebConfig.discordLoginUrl).then(() => { userState.refresh() })
        } else {
            location.href = WebConfig.discordLoginUrl;
        }
    }

    return (
        <Modal state={state}>
            <ModalHeadText>
                Log in with your account
            </ModalHeadText>
            <ModalActionRow>
                <button
                    onClick={handleLogin}
                    className="btn border btn-secondary mx-auto w-fit"
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    Login
                </button>
            </ModalActionRow>
        </Modal >
    );
}
