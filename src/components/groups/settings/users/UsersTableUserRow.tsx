import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupUser } from "../../../../js/models/group";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../../js/hooks/useModalState";
import { UpdateGroupUserModal } from "../../../modals/UpdateUserModal";
import { useTranslation } from "react-i18next";

export function UsersTableUserRow({
  user,
  onUpdated = () => {},
}: {
  user: GroupUser;
  onUpdated?: () => void;
}) {
  const { t } = useTranslation();
  const state = useModalState();

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
      <td className="flex justify-end p-2 border-t border-dotted">
        <button className="btn border btn-secondary" onClick={state.open}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <UpdateGroupUserModal
          user={user}
          state={state}
          onSaved={() => {
            state.close();
            onUpdated();
          }}
        />
      </td>
    </tr>
  );
}
