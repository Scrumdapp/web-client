import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

export default function Footer() {

    const links = [
        { to: "/about", text: <Trans i18nKey="footer.about">About</Trans>, target: "_self" },
        { to: "/privacy", text: <Trans i18nKey="footer.privacy">Privacy</Trans>, target: "_self" },
        { to: "https://scrumdapp.com/#Contact", text: <Trans i18nKey="footer.support">Support</Trans>, target: "_blank" },
    ]

    return (
        <footer className="mb-2 mx-2 card horizontal items-center justify-between">
            <span className="flex-1">
                <Trans i18nKey="footer.rights">© 2026 Scrumdapp | All rights reserved</Trans>
            </span>
            <div className="flex horizontal gap-4">
                {links.map((link, i) => (
                    <Link key={i} to={link.to} target={link.target} className="btn justify-start!">
                        {link.text}
                    </Link>
                ))}
            </div>
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