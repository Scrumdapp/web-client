import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupUser } from "../../../../js/models/group";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../../js/hooks/useModalState";
import { UpdateGroupUserModal } from "../../../modals/UpdateUserModal";
import { useTranslation } from "react-i18next";
import { DeleteGroupUserModal } from "../../../modals/DeleteGroupUserModal";

export function UsersTableUserRow({
  user,
  onUpdated = () => {},
}: {
  user: GroupUser;
  onUpdated?: () => void;
}) {
  const { t } = useTranslation();
  const updateState = useModalState();
  const deleteState = useModalState();

  return (
    <tr>
      <td className="p-2 border-r border-t border-dotted">
        {user.first_name} {user.last_name}
      </td>
      <td className="p-2 border-t border-dotted">
        {t(
          user.is_ghost
            ? "settings.users.ghost.hidden"
            : "settings.users.ghost.visible",
        )}
      </td>
      <td className="flex justify-end gap-1 p-2 border-t border-dotted">
        <button className="btn border btn-secondary" onClick={updateState.open}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="btn border btn-red" onClick={deleteState.open}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <UpdateGroupUserModal
          user={user}
          state={updateState}
          onSaved={() => {
            updateState.close();
            onUpdated();
          }}
        />
        <DeleteGroupUserModal
          groupUser={user}
          state={deleteState}
          onUserDeleted={() => {
            deleteState.close();
            onUpdated();
          }}
        />
      </td>
    </tr>
  );
}
