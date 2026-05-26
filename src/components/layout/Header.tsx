import { Link } from "react-router-dom";
import {LogoutButton} from "../generic/LogoutButton.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPortrait} from "@fortawesome/free-solid-svg-icons";
import {userContext} from "../../js/context/user/userContext.ts";
import {useContext} from "react";

export default function Header() {

    const { user: currentUser} = useContext(userContext) ?? {};
    const ShowHeaderName = currentUser
    ?`${currentUser.first_name} ${currentUser.last_name}`.trim()
        :"";

    const links = [
        { to: "/public", label: "Home" },
        { to: "/groups", label: "Groups" },
    ];

        return (
            <header className="flex mx-2">
            <nav className="bg-bg_h mt-4 mb-7 flex px-1.75 rounded-2xl border shadow-xl w-full justify-between items-center z-50">
                        <div className="shrink-0 text-fg text-2xl font-bold max-w-20">
                            <Link to="/groups">Scrumdapp</Link>
                        </div>

                        <div className="hidden md:flex space-x-6 text-black font-medium">
                            {links.map((link, i) => (
                                <Link key={i} to={link.to} className="btn w-20">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="nav-dropdown cursor-default">
                            <p className="text-right">{ ShowHeaderName || ""}</p>
                            <div className="nav-dropdown-content">
                                <div className="py-4 px-1.5 text-left">
                                    <Link to="/settings" className="btn-nav-dropdown hover:text-yellow">
                                        <FontAwesomeIcon icon={faPortrait} className="text-yellow"/>
                                        Profile
                                    </Link>
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
            </nav>
            </header>
        )
    }