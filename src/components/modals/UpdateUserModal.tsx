import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalState } from "../../js/hooks/useModalState";
import { GroupUser, PatchGroupUser } from "../../js/models/group";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import Modal from "../generic/modal/Modal";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useApi } from "../../js/hooks/api/useApi";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";
import { LoadScreen } from "../generic/LoadScreen";
import { useState } from "react";
import { useGroup } from "../../js/context/group/useGroup";
import { ShowIf } from "../utility/Conditional";
import useTempState from "../../js/hooks/useTempState";
import { ApiError } from "../../js/hooks/api/apiError";
import { Checkbox } from "../generic/Checkbox";
import { useTranslation } from "react-i18next";

export function UpdateGroupUserModal({
  user,
  state,
  onSaved = () => {},
}: {
  user: GroupUser;
  state: ModalState;
  onSaved?: () => void;
}) {
  const group = useGroup();
  const updateGroupUser = useApi(ScrumdappApi.updateGroupUser());
  const [isHidden, setIsHidden] = useState(!user.is_ghost);
  const [updated, setUpdated] = useState(false);
  const [errorValue, setErrorValue] = useTempState<ApiError>();

  const { t } = useTranslation();

  const updateUser = () => {
    if (!updated) return;
    const body: PatchGroupUser = {};
    if (isHidden == user.is_ghost) {
      body.is_ghost = !isHidden;
    }

    setUpdated(false);
    return updateGroupUser
      .runCommand(group.id, user.user_id, body)
      .then(() => onSaved())
      .catch((err) => setErrorValue(err));
  };

  return (
    <Modal state={state}>
      <ModalHeadText>
        {t("settings.users.updateTitle", {
          user: `${user.first_name} ${user.last_name}`,
        })}
      </ModalHeadText>

      <div className="vertical gap-4 mb-4">
        <div className="horizontal gap-2 flex-1">
          <Checkbox
            name="is_ghost"
            labelKey="settings.users.ghost.labelInput"
            checked={isHidden}
            onChange={(it) => {
              setIsHidden(it.target.checked);
              setUpdated(true);
            }}
          />
        </div>
      </div>

      <ModalActionRow>
        <ModalCancelButton />
        <button
          className="btn btn-secondary"
          disabled={!updated || updateGroupUser.loading}
          onClick={updateUser}
        >
          {updateGroupUser.loading ? (
            <LoadScreen />
          ) : (
            <>
              <FontAwesomeIcon icon={faCheck} /> {t("settings.users.save")}
            </>
          )}
        </button>
      </ModalActionRow>
      <ShowIf condition={errorValue != null}>
        <p className="text-red text-right">
          {errorValue?.status}: {errorValue?.message}
        </p>
      </ShowIf>
    </Modal>
  );
}
