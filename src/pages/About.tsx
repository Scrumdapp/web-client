import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div className="hidden md:block">
        <div className="mx-0">
          <div className="app-container mx-auto card horizontal gap-3 mb-4">
            <title>{t("about.title")}</title>
            <div>
              <h1 className="pb-3">{t("about.header")}</h1>
              <h2 className="py-3">{t("about.text1")}</h2>
              <p className="py-3 wrap-break-word">{t("about.text2")}</p>
              <h2 className="py-3">{t("about.contributers")}</h2>
              <div>
                <Link
                  to="https://www.linkedin.com/in/luc-van-ogtrop"
                  target="_blank"
                >
                  Luc van Ogtrop
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/luc-van-ogtrop"
                  target="_blank"
                  className="underline"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Luc van Ogtrop" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link to="https://daan.meijneken.nl/" target="_blank">
                  Daan Meijneken
                </Link>{" "}
                <Link
                  to="https://daan.meijneken.nl/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.website", { name: "Daan Meijneken" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/daan-meijneken"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Daan Meijneken" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Steven Hoekstra" })} ${t("a11y.opensInNewTab")}`}
                >
                  Steven Hoekstra
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Steven Hoekstra" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/ian-vd-werf/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ian van der Werf" })} ${t("a11y.opensInNewTab")}`}
                >
                  Ian van der Werf
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/ian-vd-werf/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ian van der Werf" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/thomas-middelbos/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Thomas Middelbos" })} ${t("a11y.opensInNewTab")}`}
                >
                  Thomas Middelbos
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/thomas-middelbos/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Thomas Middelbos" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link to="https://www.jeroenvdg.com/" target="_blank">
                  Jeroen van de Geest{" "}
                </Link>
                <Link
                  to="https://www.jeroenvdg.com"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.website", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jeroen-van-de-geest"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>{" "}
                <Link
                  to="https://github.com/JeroenoBoy"
                  target="_blank"
                  className="underline"
                  aria-label={`${t("a11y.contributor.github", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/nick-veltheer/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Nick Veltheer" })} ${t("a11y.opensInNewTab")}`}
                >
                  Nick Veltheer
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/nick-veltheer/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Nick Veltheer" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/jisse-brus/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jisse Brus" })} ${t("a11y.opensInNewTab")}`}
                >
                  Jisse Brus
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jisse-brus/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jisse Brus" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/jaymohabier/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jay Mohabier" })} ${t("a11y.opensInNewTab")}`}
                >
                  Jay Mohabier
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jaymohabier/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jay Mohabier" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/lilyleewis/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Lily Leewis" })} ${t("a11y.opensInNewTab")}`}
                >
                  Lily Leewis
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/lilyleewis/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Lily Leewis" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/ashraf-vanrooijen/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ashraf van Rooijen" })} ${t("a11y.opensInNewTab")}`}
                >
                  Ashraf van Rooijen
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/ashraf-vanrooijen/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ashraf van Rooijen" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                Jasper
              </div>
            </div>
            <div className="my-auto">
              <img
                src={`/ScrumdappLogoTransparent.webp`}
                alt={t("about.logo")}
                className="mx-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="mx-2">
          <div className="app-container mx-2 text-sm card vertical gap-3 mb-4">
            <title>{t("about.title")}</title>
            <div className="flex justify-between items-center">
              <h1 className="pb-3">{t("about.header")}</h1>
              <img
                src={`/ScrumdappLogoTransparent.webp`}
                alt={t("about.logo")}
                className="max-w-20"
              />
            </div>
            <div>
              <h2 className="py-3">{t("about.text1")}</h2>
              <p className="py-3 wrap-break-word">{t("about.text2")}</p>
              <h2 className="py-3">{t("about.contributers")}</h2>
              <div>
                <Link
                  to="https://www.linkedin.com/in/luc-van-ogtrop"
                  target="_blank"
                >
                  Luc van Ogtrop
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/luc-van-ogtrop"
                  target="_blank"
                  className="underline"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Luc van Ogtrop" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://daan.meijneken.nl/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.website", { name: "Daan Meijneken" })} ${t("a11y.opensInNewTab")}`}
                >
                  Daan Meijneken
                </Link>{" "}
                <Link to="https://daan.meijneken.nl/" target="_blank">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/daan-meijneken"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Daan Meijneken" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Steven Hoekstra" })} ${t("a11y.opensInNewTab")}`}
                >
                  Steven Hoekstra
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Steven Hoekstra" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/ian-vd-werf/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ian van der Werf" })} ${t("a11y.opensInNewTab")}`}
                >
                  Ian van der Werf
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/ian-vd-werf/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ian van der Werf" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/thomas-middelbos/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Thomas Middelbos" })} ${t("a11y.opensInNewTab")}`}
                >
                  Thomas Middelbos
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/thomas-middelbos/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Thomas Middelbos" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link to="https://www.jeroenvdg.com/" target="_blank">
                  Jeroen van de Geest{" "}
                </Link>
                <Link
                  to="https://www.jeroenvdg.com"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.website", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jeroen-van-de-geest"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>{" "}
                <Link
                  to="https://github.com/JeroenoBoy"
                  target="_blank"
                  className="underline"
                  aria-label={`${t("a11y.contributor.github", { name: "Jeroen van de Geest" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/nick-veltheer/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Nick Veltheer" })} ${t("a11y.opensInNewTab")}`}
                >
                  Nick Veltheer
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/nick-veltheer/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Nick Veltheer" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/jisse-brus/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jisse Brus" })} ${t("a11y.opensInNewTab")}`}
                >
                  Jisse Brus
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jisse-brus/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jisse Brus" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/jaymohabier/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jay Mohabier" })} ${t("a11y.opensInNewTab")}`}
                >
                  Jay Mohabier
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/jaymohabier/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Jay Mohabier" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/lilyleewis/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Lily Leewis" })} ${t("a11y.opensInNewTab")}`}
                >
                  Lily Leewis
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/lilyleewis/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Lily Leewis" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                <Link
                  to="https://www.linkedin.com/in/ashraf-vanrooijen/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ashraf van Rooijen" })} ${t("a11y.opensInNewTab")}`}
                >
                  Ashraf van Rooijen
                </Link>{" "}
                <Link
                  to="https://www.linkedin.com/in/ashraf-vanrooijen/"
                  target="_blank"
                  aria-label={`${t("a11y.contributor.linkedin", { name: "Ashraf van Rooijen" })} ${t("a11y.opensInNewTab")}`}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <br />
                Jasper
                <br />
                {t("about.more")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
