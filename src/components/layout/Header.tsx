import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../generic/LogoutButton.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import LanguageSwitch from "../translation/LanguageSwitch.tsx";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { t } = useTranslation();
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: t("header.home") },
    { to: "/groups", label: t("header.groups") },
  ];

  const mobileLinks = [
    { to: "/", label: t("header.home") },
    { to: "/groups", label: t("header.groups") },
    { to: "/about", label: t("footer.about") },
    { to: "/privacy", label: t("footer.privacy") },
    {
      to: "https://scrumdapp.com/#Contact",
      label: t("footer.support"),
      target: "_blank",
    },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="flex flex-col mx-2 fixed top-0 left-0 right-0 z-50 text-sm lg:text-xl">
        <nav className="bg-bg_h mt-2 flex px-1 rounded-full border shadow-xl w-full justify-between items-center">
          <div className="flex-1 min-w-0 text-fg text-xl md:text-2xl font-bold">
            <Link
              to="/groups"
              className="horizontal gap-1 items-center max-w-fit"
            >
              <img
                src={`/ScrumdappLogoTransparent.webp`}
                alt={t("about.logo")}
                className="nav-icon max-w-full"
              />
              Scrumdapp
            </Link>
          </div>

          <div className="hidden md:flex gap-4">
            {links.map((link, i) => (
              <Link key={i} to={link.to} className="btn py-1!">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:flex-1 justify-end h-full my-4">
            <div className="nav-dropdown cursor-default">
              <div className="horizontal justify-end items-center gap-1 absolute right-0 top-0 bottom-0 z-1 bg-bg_h rounded-r-full">
                <span className="text-nowrap">{`${user.first_name} ${user.last_name}`}</span>
                <img
                  src={user.avatar ?? "/Scrumdaddy.png"}
                  alt={t("header.profileAlt")}
                  className="nav-icon max-w-full"
                />
              </div>
              <div className="nav-dropdown-content -right-[0.5px]!">
                <div className="my-4 px-1.5 text-center">
                  <LanguageSwitch />
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="btn aspect-square md:hidden"
            aria-label={t("header.menuToggle")}
            aria-expanded={menuOpen}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </nav>

        {menuOpen && (
          <div className="bg-bg_h mt-2 rounded-2xl border shadow-xl w-full md:hidden overflow-hidden">
            <div className="flex flex-col divide-y">
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <span className="text-nowrap">{`${user.first_name} ${user.last_name}`}</span>
                <img
                  src={user.avatar ?? "/Scrumdaddy.png"}
                  alt={t("header.profileAlt")}
                  className="nav-icon max-w-full"
                />
              </div>

              <div className="flex flex-col py-1">
                {mobileLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="btn justify-start! rounded-none py-1 px-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-2 py-4 px-4">
                <LanguageSwitch />
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-20" />
    </>
  );
}
