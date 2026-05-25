import { Link } from "react-router-dom";
import {LogoutButton} from "../generic/LogoutButton.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPortrait} from "@fortawesome/free-solid-svg-icons";

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
                                <div className="py-4 px-1.5 text-left">
                                    <Link to="/settings" className="btn-mobile hover:text-yellow">
                                        <FontAwesomeIcon icon={faPortrait} className="text-yellow"/>
                                        Profile
                                    </Link>
                                    <hr className="mt-2 color-gray" />
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
            </nav>
            </header>
        )
    }