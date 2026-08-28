import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {Trans, useTranslation} from "react-i18next";

export default function About() {
    const {t} = useTranslation();
    return (
       <div className="app-container card horizontal gap-3 mb-4">
           <title>
               <Trans i18nKey="about.title">About | Scrumdapp</Trans>
           </title>
           <div>
            <h2 className="pb-3">
                <Trans i18nKey="about.header">About Scrumdapp</Trans>
            </h2>
            <h3 className="py-3">
                <Trans i18nKey="about.text1">The Ultimate SCRUM tool for your team!</Trans>
            </h3>
            <p className="py-3 wrap-break-word">
                <Trans i18nKey="about.text2">Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.
                We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.</Trans>
            </p>
            <h3 className="py-3">
                <Trans i18nKey="about.team">Our Team:</Trans>
            </h3>
            <div>
                <Link to="https://www.linkedin.com/in/luc-van-ogtrop" target="_blank">Luc van Ogtrop</Link> <Link to="https://www.linkedin.com/in/luc-van-ogtrop" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://daan.meijneken.nl/" target="_blank">Daan Meijneken</Link> <Link to="https://daan.meijneken.nl/" target="_blank"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link> <Link to="https://www.linkedin.com/in/daan-meijneken" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/" target="_blank">Steven Hoekstra</Link> <Link to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://www.linkedin.com/in/ian-vd-werf/" target="_blank">Ian van der Werf</Link> <Link to="https://www.linkedin.com/in/ian-vd-werf/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://www.linkedin.com/in/thomas-middelbos/" target="_blank">Thomas Middelbos</Link> <Link to="https://www.linkedin.com/in/thomas-middelbos/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://www.jeroenvdg.com/" target="_blank">Jeroen van de Geest </Link><Link to="https://www.jeroenvdg.com" target="_blank"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link> <Link to="https://www.linkedin.com/in/jeroen-van-de-geest" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link> <Link to="https://github.com/JeroenoBoy" target="_blank" className="underline"><FontAwesomeIcon icon={faGithub} /></Link><br />
            </div>
           </div>
           <div className="my-auto">
               <img src={`/ScrumdappLogoTransparent.webp`} alt={t('about.logo')} className="mx-auto" />
           </div>
        </div>
    )
}