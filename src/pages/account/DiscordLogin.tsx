import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

export default function DiscordLogin({ onGranted }: { onGranted: () => void }) {
    async function handleLogin(e: React.MouseEvent) {
        e.preventDefault();
        await fetch("/login", { method: "POST" });
        onGranted();
    }

    return (
        <div className="card m-auto">
            <div className="app-container vertical justify-center">
                <h2 className="mb-4">Log in with your Discord account</h2>
            <a
                onClick={handleLogin}
                href="#"
                className="btn border btn-secondary mx-auto w-fit"
            >
                <FontAwesomeIcon icon={faDiscord} />
                Login
            </a>
        </div>
</div>
);
}