import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../generic/LogoutButton.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import LanguageSwitch from "../translation/LanguageSwitch.tsx";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function HeaderMobile() {
  const { t } = useTranslation();
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: t("header.home"), target: "_self" },
    { to: "/groups", label: t("header.groups"), target: "_self" },
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
      <header className="flex flex-col mx-2 fixed top-0 left-0 right-0 z-50">
        <nav className="relative z-20 bg-bg_h mt-2 flex px-1 rounded-full border shadow-xl w-full justify-between items-center">
          <div className="flex-1 min-w-0 text-fg font-bold text-xl">
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

          <h2 className="hidden md:flex gap-4">
            {links.map((link, i) => (
              <Link key={i} to={link.to} className="btn py-1!">
                {link.label}
              </Link>
            ))}
          </h2>

          <div className="hidden md:flex md:flex-1 justify-end h-full my-4">
            <div className="nav-dropdown cursor-default">
              <div className="horizontal justify-end items-center gap-1 absolute right-0 top-0 bottom-0 z-1 rounded-r-full">
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
          <div
            className="fixed inset-0 z-10 flex px-2 pt-16 backdrop-blur-lg bg-[unset] w-full max-w-screen md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="bg-bg_h rounded-xl border shadow-xl w-full overflow-hidden h-fit px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="text-nowrap">{`${user.first_name} ${user.last_name}`}</span>
                  <img
                    src={user.avatar ?? "/Scrumdaddy.png"}
                    alt={t("header.profileAlt")}
                    className="nav-icon max-w-full"
                  />
                </div>

                <div className="vertical gap-1">
                  <hr className="text-gray" />
                  <NavbarLink
                    to={`/`}
                    target="_self"
                    translationKey="header.home"
                  />
                  <NavbarLink
                    to={`/groups`}
                    target="_self"
                    translationKey="header.groups"
                  />
                  <NavbarLink
                    to={`/about`}
                    target="_self"
                    translationKey="footer.about"
                  />
                  <NavbarLink
                    to={`/privacy`}
                    target="_self"
                    translationKey="footer.privacy"
                  />
                  <NavbarLink
                    to={`https://scrumdapp.com/#Contact`}
                    target="_blank"
                    translationKey="footer.support"
                  />
                  <hr className="text-gray" />
                </div>

                <div className="flex flex-col items-start gap-2 mt-2 pt-2 pb-4 px-2">
                  <div className="horizontal gap-3">
                    {t("header.language")}: <LanguageSwitch />
                  </div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-15 md:h-20" />
    </>
  );
}

function NavbarLink({
  to,
  translationKey,
  target,
}: {
  to: string;
  translationKey: string;
  target: string;
}) {
  const { t } = useTranslation();

  return (
    <Link to={to} className="btn justify-start" target={target}>
      {t(translationKey)}
    </Link>
  );
}
