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
      <th scope="row" className="p-2 border-r border-t border-dotted text-left">
        {groupUser.first_name} {groupUser.last_name}
      </th>
      <td className="p-2 border-t border-dotted">
        {t(
          groupUser.is_ghost
            ? "settings.users.ghost.hidden"
            : "settings.users.ghost.visible",
        )}
      </td>
      <td className="flex justify-end gap-1 p-2 border-t border-dotted">
        <button
          type="button"
          className="btn border btn-secondary min-w-6 min-h-6"
          onClick={updateState.open}
          aria-label={t("a11y.users.edit", {
            name: `${groupUser.first_name} ${groupUser.last_name}`,
          })}
        >
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
            <button
              type="button"
              className="btn border btn-red min-w-6 min-h-6"
              onClick={deleteState.open}
              aria-label={t("a11y.users.delete", {
                name: `${groupUser.first_name} ${groupUser.last_name}`,
              })}
            >
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
