import { Link } from "react-router-dom";
import { LogoutButton } from "../generic/LogoutButton.tsx";
import { useUser } from "../../js/context/user/useUser.ts";
import LanguageSwitch from "../translation/LanguageSwitch.tsx";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

export default function Header() {
  const { t } = useTranslation();
  const user = useUser();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { to: "/", label: t("header.home"), target: "_self" },
    { to: "/groups", label: t("header.groups"), target: "_self" },
  ];

  return (
    <>
      <header className="flex flex-col mx-2 fixed top-0 left-0 right-0 z-50">
        <nav
          aria-label={t("a11y.nav.main")}
          className="bg-bg_h mt-2 flex px-1 rounded-full border shadow-xl w-full justify-between items-center"
        >
          <div className="flex-1 text-fg font-bold">
            <Link
              to="/groups"
              className="horizontal gap-1 items-center max-w-fit text-xl"
            >
              <img
                src={`/ScrumdappLogoTransparent.webp`}
                alt=""
                className="nav-icon max-w-full"
              />
              Scrumdapp
            </Link>
          </div>

          <div className="horizontal gap-4">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                target={link.target}
                className="btn py-1!"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 flex justify-end h-full">
            <div
              className={`nav-dropdown cursor-default min-w-48 h-10 ${accountMenuOpen ? "is-open" : ""}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setAccountMenuOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && accountMenuOpen) {
                  setAccountMenuOpen(false);
                  accountMenuButtonRef.current?.focus();
                }
              }}
            >
              <button
                ref={accountMenuButtonRef}
                type="button"
                className="horizontal py-1 justify-end items-center gap-1 absolute right-0 top-0 bottom-0 z-1 bg-bg_h rounded-r-full"
                aria-label={`${user.first_name} ${user.last_name}, ${t("a11y.accountMenu")}`}
                aria-expanded={accountMenuOpen}
                aria-controls="account-menu"
                onClick={() => setAccountMenuOpen((open) => !open)}
              >
                <span className="text-right text-nowrap truncate break-words">{`${user.first_name} ${user.last_name}`}</span>
                <img
                  src={user.avatar ?? "/Scrumdaddy.png"}
                  alt=""
                  className="nav-icon max-w-full"
                />
              </button>
              <div
                id="account-menu"
                className="nav-dropdown-content -right-[0.04rem]!"
              >
                <div className="my-4 px-1.5 text-center">
                  <LanguageSwitch />
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="h-15 md:h-20" />
    </>
  );
}
