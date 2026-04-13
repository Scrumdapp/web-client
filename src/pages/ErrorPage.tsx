import {Link, useNavigate} from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

    return (
        <div className="app-container vertical gap-4">
            <img src="https://http.cat/images/404.jpg" alt="404 error, page not found" className="border rounded-2xl mx-auto" />
            <Link
                to=".." className="mx-auto bg-bg! card btn text-xl"
                onClick={(e) => {e.preventDefault();navigate(-1);}}>Go back
            </Link>
        </div>
    )
}