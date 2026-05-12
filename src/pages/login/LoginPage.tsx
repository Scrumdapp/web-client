import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="app-container card text-center">
            <h2>Log into your account:</h2>
            <Link to="/account/login" className="btn border btn-secondary justify-center mx-auto w-fit ">
                Login
            </Link>
            <Link to="/account/forgot-password" className="underline">I forgot my password</Link>
            <br></br>
            <br></br>
            <h2>Or make a new account:</h2>
            <Link to="/account/new-account" className="btn border justify-center mx-auto w-fit">
                Make new account
            </Link>
        </div>
    )
}