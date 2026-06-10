import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn, faGithub} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

export default function Footer() {

    const links = [
        { to: "/about", label: "About", external: false },
        { to: "/privacy", label: "Privacy", external: false },
        { to: "https://scrumdapp.com/#Contact", label: "Support", external: true },
    ];

    return (
    <footer className="px-2 mb-2 flex-col">
        <div className="mx-auto p-3 rounded-2xl bg-bg_h shadow-xl border w-full">
            <div className="flex flex-row items-center justify-between px-3">
                <span>© 2026 Scrumdapp | All rights reserved</span>
                    <span className="flex-1 flex flex-wrap justify-between gap-3">
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
                <div className="flex items-center gap-4">
                    <Link to="https://www.linkedin.com/company/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                    <Link to="https://x.com/scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faXTwitter} /></Link>
                    <Link to="https://www.instagram.com/scrumdapp/" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link to="https://www.youtube.com/@Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faYoutube} /></Link>
                    <Link to="https://github.com/Scrumdapp" target="_blank" className="border btn aspect-square text-xl"><FontAwesomeIcon icon={faGithub} /></Link>
                </div>
            </div>
        </div>
    </footer>
    )
}