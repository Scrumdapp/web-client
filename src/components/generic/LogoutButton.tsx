import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

export function LogoutButton() {
    return (
        <a className="btn-mobile hover:text-red" type="button" href="/oauth2/logout">
            <FontAwesomeIcon icon={faSignOut} className="text-red "/>
            Logout
        </a>
    )
}