import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function DiscordLoginReturnPage() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/groups", { replace: true })
    }, [navigate])

    return (
        <div className="app-container card text-center vertical justify-evenly">
            <Link to="/groups" className="btn border mx-auto w-fit ">
                Return to Home
            </Link>
        </div>
    )
}