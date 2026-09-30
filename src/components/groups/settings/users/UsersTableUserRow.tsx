import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupUser } from "../../../../js/models/group";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../../js/hooks/useModalState";
import { UpdateGroupUserModal } from "../../../modals/UpdateUserModal";
import { useTranslation } from "react-i18next";
import { DeleteGroupUserModal } from "../../../modals/DeleteGroupUserModal";
import { hasRole, Role } from "../../../../js/utils/userPermissions";
import { useUser } from "../../../../js/context/user/useUser";

export function UsersTableUserRow({
  groupUser,
  onUpdated = () => {},
}: {
  groupUser: GroupUser;
  onUpdated?: () => void;
}) {
  const user = useUser();
  const { t } = useTranslation();
  const updateState = useModalState();
  const deleteState = useModalState();

  return (
    <tr>
      <td className="p-2 border-r border-t border-dotted">
        {groupUser.first_name} {groupUser.last_name}
      </td>
      <td className="p-2 border-t border-dotted">
        {t(
          groupUser.is_ghost
            ? "settings.users.ghost.hidden"
            : "settings.users.ghost.visible",
        )}
      </td>
      <td className="flex justify-end gap-1 p-2 border-t border-dotted">
        <button className="btn border btn-secondary" onClick={updateState.open}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <UpdateGroupUserModal
          user={groupUser}
          state={updateState}
          onSaved={() => {
            updateState.close();
            onUpdated();
          }}
        />
        {hasRole(user, Role.Coach) && user.id != groupUser.user_id && (
          <>
            <button className="btn border btn-red" onClick={deleteState.open}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <DeleteGroupUserModal
              groupUser={groupUser}
              state={deleteState}
              onUserDeleted={() => {
                deleteState.close();
                onUpdated();
              }}
            />
          </>
        )}
      </td>
    </tr>
  );
}
