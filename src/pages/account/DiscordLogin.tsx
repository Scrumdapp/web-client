import {Link} from "react-router-dom";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function DiscordLogin() {
    return (
        <div className="app-container card text-center vertical justify-evenly">
            <div className="app-container vertical justify-center">
                <h2 className="mb-4">Log in with your Discord account</h2>
                <Link to="login" className="btn border btn-secondary mx-auto w-fit ">
                    <FontAwesomeIcon icon={faDiscord} />
                    Login
                </Link>
            </div>
        </div>
    )
}