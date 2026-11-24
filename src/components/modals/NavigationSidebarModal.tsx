import { ModalState } from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

type NavigationLayoutModalProps = {
  modal: ModalState;
  title: string;
  children: React.ReactNode;
};

export default function NavigationSidebarModal({
  modal,
  title,
  children,
}: NavigationLayoutModalProps) {
  const { t } = useTranslation();

  return (
    <Modal state={modal} className="mx-2 w-full">
      <div className="flex flex-col divide-y">
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="pl-2 p-1 text-xl md:text-2xl">{title}</h1>
            <button
              type="button"
              className="pr-2 p-1"
              onClick={modal.close}
              aria-label={t("checkpoint.modal.menuClose")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
}
