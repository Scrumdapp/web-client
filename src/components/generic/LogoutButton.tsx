import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

export const handleLogout= () => {
    location.href='/oauth2/logout'
}

export function LogoutButton() {
    return (
        <button className="btn-mobile hover:text-red" type="button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="text-red "/>
            Logout
        </button>
    )
}