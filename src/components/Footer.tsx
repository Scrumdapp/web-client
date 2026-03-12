import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faYoutube, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router";

export default function Footer() {
    return (
    <footer className="pt-16 pb-7 px-2">
        <div className="mx-auto px-4 lg:px-12 p-12 rounded-2xl bg-bg shadow-xl border footer">
            <div
                className="flex flex-row items-center justify-between pb-8">
                <Link to="/public" className="btn">Home</Link>
                <Link to="/about" className="btn">About</Link>
                <Link to="/privacy" className="btn">Privacy</Link>
                <Link to="/groups" className="btn">Groups</Link>
                <Link to="/support" className="btn">Support</Link>
                <Link to="/terms" className="btn">Terms</Link>
                <Link to="/cookies" className="btn">Cookies</Link>
            </div>

            <div className="bg-fg h-0.5 rounded-full"></div>

            <div className="flex flex-row items-center justify-between pt-8">
                <h1 className="text-(--color-primary)">© 2026 Scrumdapp. All rights reserved</h1>
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