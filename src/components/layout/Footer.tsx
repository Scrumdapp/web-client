import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

export default function Footer() {

    const links = [
        { to: "/public", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/privacy", label: "Privacy" },
        { to: "/groups", label: "Groups" },
        { to: "/support", label: "Support" },
        { to: "/terms", label: "Terms" },
        { to: "/cookies", label: "Cookies" },
    ];

    return (
    <footer className="mt-7 pb-4 px-2 flex-col">
        <div className="mx-auto p-2 rounded-2xl bg-bg_h shadow-xl border w-full">
            <div className="flex flex-wrap items-center justify-between pb-4">
                {links.map(link => (
                    <Link key={link.to} to={link.to} className="btn w-20 sm:text-sm md:text-start lg:text-lg">
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="bg-fg h-0.5 rounded-full"></div>

            <div className="flex flex-row items-center justify-between pt-4 px-3">
                <span>© 2026 Scrumdapp. All rights reserved</span>
                <div className="flex items-center gap-4">
                    <Link to="https://www.linkedin.com/company/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                    <Link to="https://x.com/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faXTwitter} /></Link>
                    <Link to="https://www.instagram.com/scrumdapp/" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="https://www.youtube.com/@Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faYoutube} /></Link>
                    <Link to="https://github.com/Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faGithub} /></Link>
                </div>
            </div>
        </div>
    </footer>)
}