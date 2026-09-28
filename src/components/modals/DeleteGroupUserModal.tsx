import { ReactNode, useEffect, useRef, useState } from "react";
import { ModalState } from "../../js/hooks/useModalState";
import Modal from "../generic/modal/Modal";
import { GroupUser } from "../../js/models/group";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import { useTranslation } from "react-i18next";
import { useApi } from "../../js/hooks/api/useApi";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";

export function DeleteGroupUserModal({
  state,
  groupUser,
  onUserDeleted,
}: {
  state: ModalState;
  groupUser: GroupUser;
  onUserDeleted: () => void;
}) {
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    if (state.isOpen) return;
    setViewIndex(0);
  }, [state.isOpen]);

  const pages: ModalPage[] = [ModalPage1, ModalPage2, ModalPage3];

  const Page = pages[viewIndex];

  return (
    <Modal state={state} className="max-w-lg">
      <Page
        user={groupUser}
        onNextCalled={() => setViewIndex((i) => i + 1)}
        onSucceedCalled={onUserDeleted}
      />
    </Modal>
  );
}

interface ModalPageProps {
  user: GroupUser;
  onNextCalled: () => void;
  onSucceedCalled: () => void;
}

type ModalPage = (props: ModalPageProps) => ReactNode;

function ModalPage1({ onNextCalled, user }: ModalPageProps) {
  const { t } = useTranslation();
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <ModalHeadText>
        {t("settings.users.delete.title", { user: fullName })}
      </ModalHeadText>
      <p className="mb-4">
        {t("settings.users.delete.warn.desc", { user: fullName })}
      </p>
      <ModalActionRow>
        <ModalCancelButton />
        <button className="btn btn-red border" onClick={onNextCalled}>
          <FontAwesomeIcon icon={faArrowRight} />
          {t("settings.users.delete.warn.next")}
        </button>
      </ModalActionRow>
      <p className="muted text-right">
        {t("settings.users.delete.steps", { index: 2, total: 3 })}
      </p>
    </>
  );
}

function ModalPage2({ onNextCalled, user }: ModalPageProps) {
  const deleteGroupUser = useApi(ScrumdappApi.deleteGroupUser());
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const fullName = `${user.first_name} ${user.last_name}`;

  const canDelete = name.toLowerCase() == user.first_name.toLowerCase();

  const deleteUser = () => {
    if (!canDelete) return;
    deleteGroupUser
      .runCommand(user.group_id, user.user_id)
      .then(() => onNextCalled());
  };

  return (
    <>
      <ModalHeadText>
        {t("settings.users.delete.title", { user: fullName })}
      </ModalHeadText>
      <div className="mb-4">
        <p className="mb-2">
          {t("settings.users.delete.confirm.desc", {
            user: fullName,
            target: user.first_name,
          })}
        </p>
        <input
          placeholder={t("settings.users.delete.confirm.placeholder")}
          className="write-section w-full"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ModalActionRow>
        <ModalCancelButton />
        <button
          className="btn btn-red border"
          onClick={deleteUser}
          disabled={!canDelete || deleteGroupUser.loading}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          {t("settings.users.delete.confirm.next")}
        </button>
      </ModalActionRow>
      <p className="muted text-right">
        {t("settings.users.delete.steps", { index: 2, total: 3 })}
      </p>
    </>
  );
}

function ModalPage3({ onSucceedCalled, user }: ModalPageProps) {
  const { t } = useTranslation();
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <ModalHeadText>
        {t("settings.users.delete.deleted.title", { user: fullName })}
      </ModalHeadText>
      {t("settings.users.delete.deleted.desc", { user: fullName })}
      <ModalActionRow>
        <button className="btn btn-secondary border" onClick={onSucceedCalled}>
          <FontAwesomeIcon icon={faCheck} />
          {t("settings.users.delete.deleted.close")}
        </button>
      </ModalActionRow>
      <p className="muted text-right">
        {t("settings.users.delete.steps", { index: 3, total: 3 })}
      </p>
    </>
  );
}
