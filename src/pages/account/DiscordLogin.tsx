import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const API_URL = (import.meta.env.VITE_SCRUMDAPP_API_URL ?? "/api").replace(/\/$/, "")
const DISCORD_AUTH_URL = `${API_URL}/oauth2/authorization/discord`

export default function DiscordLogin({ onAccept }: { onAccept: () => void }) {
    return (
        <div className="card m-auto">
            <div className="app-container vertical justify-center">
                <h2 className="mb-4">Log in with your Discord account</h2>
                <a
                    onClick={onAccept}
                    href={DISCORD_AUTH_URL}
                    className="btn border btn-secondary mx-auto w-fit"
                >
                    <FontAwesomeIcon icon={faDiscord} />
                    Login
                </a>
            </div>
        </div>
    )
}