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
import ChangeLogModal from "../modals/ChangeLogModal.tsx";
import { useModalState } from "../../js/hooks/useModalState.ts";

export default function Footer() {
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

  const modal = useModalState();

  return (
    <footer className="m-2 mt-4 card horizontal items-center justify-between gap-2">
      <span className="flex-1">{t("footer.rights")}</span>
      <nav aria-label={t("a11y.nav.footer")} className="horizontal flex gap-4">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            target={link.target}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={
              link.target === "_blank"
                ? `${link.text} ${t("a11y.opensInNewTab")}`
                : undefined
            }
            className="btn justify-start"
          >
            {link.text}
          </Link>
        ))}
        <button className="btn" onClick={modal.open}>
          {t("changelogs.title")}
        </button>
        <ChangeLogModal modal={modal} />
      </nav>
      <nav
        aria-label={t("a11y.nav.social")}
        className="flex-1 grid grid-rows-1 grid-flow-col gap-2 items-center justify-end"
      >
        <Link
          to="https://www.linkedin.com/company/scrumdapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.social.linkedin")} ${t("a11y.opensInNewTab")}`}
          className="border btn aspect-square text-xl"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Link>
        <Link
          to="https://x.com/scrumdapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.social.x")} ${t("a11y.opensInNewTab")}`}
          className="border btn aspect-square text-xl"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>
        <Link
          to="https://www.instagram.com/scrumdapp/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.social.instagram")} ${t("a11y.opensInNewTab")}`}
          className="border btn aspect-square text-xl"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          to="https://www.youtube.com/@Scrumdapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.social.youtube")} ${t("a11y.opensInNewTab")}`}
          className="border btn aspect-square text-xl"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </Link>
        <Link
          to="https://github.com/Scrumdapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.social.github")} ${t("a11y.opensInNewTab")}`}
          className="border btn aspect-square text-xl"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </nav>
    </footer>
  );
}
