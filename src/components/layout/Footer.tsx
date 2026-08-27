import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import {Trans} from "react-i18next";

export default function Footer() {

    const links = [
        { to: "/about", label: <Trans i18nKey="footer.about">About</Trans>, external: false },
        { to: "/privacy", label: <Trans i18nKey="footer.privacy">Privacy</Trans>, external: false },
        { to: "https://scrumdapp.com/#Contact", label: <Trans i18nKey="footer.support">Support</Trans>, external: true },
    ];

    return (
        <footer className="mb-2 mx-2 card horizontal items-center justify-between">
            <span className="flex-1">
                <Trans i18nKey="footer.rights">© 2026 Scrumdapp | All rights reserved</Trans>
            </span>
            <span className="flex-1 flex flex-wrap justify-center gap-3">
                {links.map(({ to, label, external }) => external ? (
                    <a key={label} href={to} target="_blank" rel="noopener noreferrer" className="btn w-20 sm:text-sm md:text-start lg:text-lg">
                        {label}
                    </a>
                ) : (
                    <Link key={label} to={to} className="btn w-20 sm:text-sm md:text-start lg:text-lg">
                        {label}
                    </Link>
                ))}
            </span>
            <div className="flex-1 flex items-center gap-4 justify-end">
                <Link to="https://www.linkedin.com/company/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                <Link to="https://x.com/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faXTwitter} /></Link>
                <Link to="https://www.instagram.com/scrumdapp/" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faInstagram} /></Link>
                <Link to="https://www.youtube.com/@Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faYoutube} /></Link>
                <Link to="https://github.com/Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faGithub} /></Link>
            </div>
    </footer>
    )
}