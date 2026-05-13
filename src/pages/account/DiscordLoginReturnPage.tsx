import { Link } from "react-router-dom";

export default function DiscordLoginReturnPage() {
    return (
        <div className="app-container card text-center vertical justify-evenly">
            <Link to="/groups" className="btn border mx-auto w-fit ">
                Return to Home
            </Link>
        </div>
    )
}