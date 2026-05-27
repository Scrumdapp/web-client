import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserState } from "../../js/context/user/useUser.ts";
import { useNavigate } from "react-router-dom";
import { WebConfig } from "../../config.ts";

export default function LoginPage() {

    const userState = useUserState();
    const navigate = useNavigate()

    if (userState.user != null) {
        // Hacky, navigation shit again
        setTimeout(() => navigate("/"), 1)
    }

    // Unfortunately, there is no other way to handle the request
    const handleLogin = () => {
        if (import.meta.env.DEV) {
            fetch(WebConfig.discordLoginUrl).then(() => location.href = "/")
        } else {
            location.href = WebConfig.discordLoginUrl;
        }
    }

    return (
        <div className="card m-auto">
            <div className="app-container vertical justify-center">
                <h2 className="mb-4">Log in with your Discord account</h2>
                <button
                    onClick={handleLogin}
                    className="btn border btn-secondary mx-auto w-fit"
                >
                    <FontAwesomeIcon icon={faDiscord} />
                    Login
                </button>
            </div>
        </div>
    );
}
