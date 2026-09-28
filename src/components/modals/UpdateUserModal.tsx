import { ModalState } from "../../js/hooks/useModalState";
import { GroupUser } from "../../js/models/group";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import Modal from "../generic/modal/Modal";

export function UpdateGroupUserModal({
  user,
  state,
  onSaved,
}: {
  user: GroupUser;
  state: ModalState;
  onSaved: () => void;
}) {
  return (
    <Modal state={state}>
      <ModalHeadText>Update user {user.first_name}</ModalHeadText>

      <ModalActionRow>
        <ModalCancelButton />
        <button>Save</button>
      </ModalActionRow>
    </Modal>
  );
}
