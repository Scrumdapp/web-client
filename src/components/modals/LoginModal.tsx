import { ModalState } from "../../js/hooks/useModalState";
import Modal from "../generic/modal/Modal";
import { WebConfig } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import { useUserState } from "../../js/context/user/useUser";
import { useEffect } from "react";
import { useBrowserFocus } from "../../js/hooks/useBrowserFocus";
import {useTranslation} from "react-i18next";

export function LoginModal({ state }: { state: ModalState }) {
    const { t } = useTranslation();
    const userState = useUserState();
    const focused = useBrowserFocus();

    // Unfortunately, there is no other way to handle the request
    const handleLogin = () => {
        if (import.meta.env.DEV) {
            fetch(WebConfig.oauthLoginUrl).then(() => { userState.refresh() })
        } else {
            location.href = WebConfig.oauthLoginUrl;
        }
    }

    useEffect(() => {
        if (!state.isOpen) { return; }

        const id = setInterval(() => {
            userState.refresh()
        }, focused ? 2000 : 10000)

        return () => clearInterval(id)
    }, [state.isOpen, focused])

    return (
        <Modal state={state} backgroundClickClose={false}>
            <ModalHeadText>
                {t('login.modal.headtext')}
            </ModalHeadText>
            <p className="pb-4">
                {t('login.modal.expired')}
            </p>
            <ModalActionRow>
                <button
                    onClick={handleLogin}
                    className="btn border btn-secondary"
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    {t('login.modal.login')}
                </button>
            </ModalActionRow>
        </Modal >
    );
}
