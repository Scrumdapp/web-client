import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalState } from "../../js/hooks/useModalState";
import { GroupUser } from "../../js/models/group";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import Modal from "../generic/modal/Modal";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function UpdateGroupUserModal({
  user,
  state,
  onSaved = () => {},
}: {
  user: GroupUser;
  state: ModalState;
  onSaved?: () => void;
}) {
  return (
    <Modal state={state}>
      <ModalHeadText>Update user {user.first_name}</ModalHeadText>

      <ModalActionRow>
        <ModalCancelButton />
        <button className="btn btn-secondary">
          <FontAwesomeIcon icon={faCheck} /> Save
        </button>
      </ModalActionRow>
    </Modal>
  );
}
