import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="app-container card text-center vertical justify-between">
            <div className="app-container vertical justify-center gap-4">
                <h2>Log into your account</h2>
                <Link to="login" className="btn border btn-secondary mx-auto w-fit ">
                    Login
                </Link>
                <Link to="forgot-password" className="underline">I forgot my password</Link>
            </div>
            <hr className="my-2 mr-0" />
            <div className="app-container vertical justify-center gap-4">
                <h2>Or make a new account:</h2>
                <Link to="new-account" className="btn border mx-auto w-fit">
                    Make new account
                </Link>
            </div>
        </div>
    )
}