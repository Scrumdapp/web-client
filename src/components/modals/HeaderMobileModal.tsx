import { LogoutButton } from "../generic/LogoutButton.tsx";
import Modal from "../generic/modal/Modal.tsx";
import LanguageSwitch from "../translation/LanguageSwitch.tsx";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../js/context/user/useUser.ts";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { ShowIf } from "../utility/Conditional.tsx";
import { hasRole, Role } from "../../js/utils/userPermissions.ts";

type HeaderMobileModalProps = {
  modal: ModalState;
};

export default function HeaderMobileModal({ modal }: HeaderMobileModalProps) {
  const { t } = useTranslation();
  const user = useUser();

  return (
    <Modal
      state={modal}
      dialogClassName="fixed inset-0 z-10 m-0 h-dvh max-h-dvh pt-16 pb-2"
      className="mx-auto mt-0 mb-auto w-full max-h-full overflow-y-auto overscroll-contain"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-nowrap">{`${user.first_name} ${user.last_name}`}</span>
          <img
            src={user.avatar ?? "/Scrumdaddy.png"}
            alt={t("header.profileAlt")}
            className="nav-icon max-w-full"
          />
        </div>

        <div className="vertical gap-2 px-2">
          <hr className="text-gray" />
          <NavbarLink
            to="/"
            target="_self"
            translationKey="header.home"
            onClick={modal.close}
          />
          <NavbarLink
            to="/groups"
            target="_self"
            translationKey="header.groups"
            onClick={modal.close}
          />
          <ShowIf condition={hasRole(user, Role.Coach)}>
            <NavbarLink
              to="/tribes"
              target="_self"
              translationKey="header.tribes"
              onClick={modal.close}
            />
          </ShowIf>
          <NavbarLink
            to="/about"
            target="_self"
            translationKey="footer.about"
            onClick={modal.close}
          />
          <NavbarLink
            to="/privacy"
            target="_self"
            translationKey="footer.privacy"
            onClick={modal.close}
          />
          <NavbarLink
            to="https://scrumdapp.com/#Contact"
            target="_blank"
            translationKey="footer.support"
            onClick={modal.close}
          />
          <hr className="text-gray" />
        </div>

        <div className="flex flex-col items-start gap-2 mt-2 pt-2 pb-4 px-2 pl-4">
          <div className="horizontal gap-3">
            {t("header.language")}: <LanguageSwitch />
          </div>
          <LogoutButton />
        </div>
      </div>
    </Modal>
  );
}

function NavbarLink({
  to,
  translationKey,
  target,
  onClick,
}: {
  to: string;
  translationKey: string;
  target: string;
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <NavLink
      to={to}
      target={target}
      onClick={onClick}
      className={({ isActive }) =>
        `btn justify-start ${isActive ? "bg-bg2" : ""}`
      }
    >
      {t(translationKey)}
    </NavLink>
  );
}
