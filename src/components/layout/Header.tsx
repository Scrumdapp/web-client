import { Link } from "react-router-dom";
import {LogoutButton} from "../generic/LogoutButton.tsx";


export default function Header() {

    const links = [
        { to: "/public", label: "Home" },
        { to: "/groups", label: "Groups" },
    ];

        return (
            <header className="flex mx-2">
            <nav className="bg-bg_h mt-4 mb-7 flex px-1.75 rounded-2xl border shadow-xl w-full justify-between items-center z-50">
                        <div className="shrink-0 text-fg text-2xl font-bold max-w-20">
                            <Link to="/public">Scrumdapp</Link>
                        </div>

                        <div className="hidden md:flex space-x-6 text-black font-medium">
                            {links.map((link, i) => (
                                <Link key={i} to={link.to} className="btn w-20">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="dropdown">
                            <p className="text-right">UserName123</p>
                            <div className="dropdown-content">
                                <div className="p-5">
                                    <Link to="/login" className="btn-mobile">Profile</Link>
                                    <a href="/public" className="btn-mobile">Home</a>
                                    <a href="/about" className="btn-mobile">About</a>
                                    <a href="/privacy" className="btn-mobile">Privacy</a>
                                    <a href="/groups" className="btn-mobile">Groups</a>
                                    <a href="/support" className="btn-mobile">Support</a>
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>







            </nav>
            </header>
        )
    }