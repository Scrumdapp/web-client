import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faYoutube,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FooterMobile() {
  const { t } = useTranslation();

  const links = [
    { to: "/about", text: t("footer.about"), target: "_self" },
    { to: "/privacy", text: t("footer.privacy"), target: "_self" },
    {
      to: "https://scrumdapp.com/#Contact",
      text: t("footer.support"),
      target: "_blank",
    },
  ];

  return (
    <footer className="mb-2 mx-2 mt-2 md:mt-0 card vertical items-center justify-between gap-2">
      <div className="horizontal gap-2 text-sm">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            target={link.target}
            className="btn justify-start"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex-1 horizontal gap-2 items-center justify-end">
        <Link
          to="https://www.linkedin.com/company/scrumdapp"
          target="_blank"
          className="border btn aspect-square text-xs"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Link>
        <Link
          to="https://x.com/scrumdapp"
          target="_blank"
          className="border btn aspect-square text-xs"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>
        <Link
          to="https://www.instagram.com/scrumdapp/"
          target="_blank"
          className="border btn aspect-square text-xs"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          to="https://www.youtube.com/@Scrumdapp"
          target="_blank"
          className="border btn aspect-square text-xs"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </Link>
        <Link
          to="https://github.com/Scrumdapp"
          target="_blank"
          className="border btn aspect-square text-xs"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
      <span className="flex-1 text-xs mt-2">{t("footer.rights")}</span>
    </footer>
  );
}
