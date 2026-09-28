import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupUser } from "../../../../js/models/group";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export function UsersTableUserRow({ user }: { user: GroupUser }) {
  return (
    <tr>
      <td className="p-2 border-r border-t border-dotted">
        {user.first_name} {user.last_name}
      </td>
      <td className="p-2 border-t border-dotted">
        {user.is_ghost ? "Hidden" : "Visible"}
      </td>
      <td className="flex justify-end p-2 border-t border-dotted">
        <button className="btn border btn-secondary">
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </td>
    </tr>
  );
}
