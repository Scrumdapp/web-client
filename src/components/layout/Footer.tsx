import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

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
    <footer className="pt-7 pb-7 px-2 flex-col">
        <div className="mx-auto px-4 lg:px-12 py-4 rounded-2xl bg-bg shadow-xl border w-11/12">
            <div className="flex flex-wrap items-center justify-between pb-4">
                {links.map(link => (
                    <Link key={link.to} to={link.to} className="btn w-20 sm:text-sm md:text-start lg:text-lg">
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="bg-fg h-0.5 rounded-full"></div>

            <div className="flex flex-row items-center justify-between pt-4">
                <h1 className="sm:text-sm text-(--color-primary)">© 2026 Scrumdapp. All rights reserved</h1>
                <div className="flex items-center gap-4">
                    <a href="https://x.com"
                       className="border btn aspect-square text-xl">
                        <FontAwesomeIcon icon={faXTwitter} /></a>
                    <a href="https://instagram.com"
                       className="border btn aspect-square text-xl">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://linkedin.com"
                       className="border btn aspect-square text-xl">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="https://www.youtube.com/@Scrumdapp"
                       className="border btn aspect-square text-xl">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>
            </div>
        </div>
    </footer>)
}