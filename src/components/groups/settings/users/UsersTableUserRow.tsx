import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupUser } from "../../../../js/models/group";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../../js/hooks/useModalState";
import { UpdateGroupUserModal } from "../../../modals/UpdateUserModal";

export function UsersTableUserRow({ user }: { user: GroupUser }) {
  const state = useModalState();

  return (
    <tr>
      <td className="p-2 border-r border-t border-dotted">
        {user.first_name} {user.last_name}
      </td>
      <td className="p-2 border-t border-dotted">
        {user.is_ghost ? "Hidden" : "Visible"}
      </td>
      <td className="flex justify-end p-2 border-t border-dotted">
        <button className="btn border btn-secondary" onClick={state.open}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <UpdateGroupUserModal user={user} state={state} onSaved={state.close} />
      </td>
    </tr>
  );
}
