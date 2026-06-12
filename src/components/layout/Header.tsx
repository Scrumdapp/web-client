import { Link } from "react-router-dom";
import { LogoutButton } from "../generic/LogoutButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../js/context/user/useUser.ts";
import ScrumdappLogoTransparant from "../../assets/ScrumdappLogoTransparent.webp"

export default function Header() {

    const user = useUser()

    const links = [
        { to: "/", label: "Home" },
        { to: "/groups", label: "Groups" },
    ];

    return (
        <header className="flex mx-2">
            <nav className="bg-bg_h mt-2 mb-7 flex px-1 rounded-full border shadow-xl w-full justify-between items-center z-50">
                <div className="flex-1 text-fg text-2xl font-bold">
                    <Link to="/groups" className="horizontal gap-1 items-center">
                        <img alt="scrumdapp-logo" src={ScrumdappLogoTransparant} className="nav-icon" />
                        Scrumdapp
                    </Link>
                </div>

                <div className="flex-1 flex space-x-6 text-black justify-center font-medium">
                    {links.map((link, i) => (
                        <Link key={i} to={link.to} className="btn w-20 py-1!">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="flex-1 nav-dropdown cursor-default">
                    <div className="horizontal justify-end items-center gap-1">
                        <span>{`${user.first_name} ${user.last_name}`}</span>
                        <img alt="user-profile-picture" src={user.avatar ?? "/Scrumdaddy.png"} className="nav-icon" />
                    </div>
                    <div className="nav-dropdown-content -right-[0.5px]!">
                        <div className="py-4 px-1.5 text-left">
                            <Link to="/settings" className="btn-nav-dropdown hover:text-yellow">
                                <FontAwesomeIcon icon={faPortrait} className="text-yellow" />
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
