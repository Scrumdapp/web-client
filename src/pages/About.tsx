import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

export default function About() {
    return (
       <div className="app-container card horizontal gap-3 mb-4">
           <div>
            <h2 className="pb-3">About Scrumdapp</h2>
            <h3 className="py-3">The Ultimate SCRUM tool for your team!</h3>
            <p className="py-3 wrap-break-word">
                Scrumdapp was born out of frustration of not being able to easily manage the daily stand-ups from a team or project.
                We have brought you an easy way to keep track of this using a easy-to-understand UI, great accessibility and many security and privacy features in the design.
            </p>
            <h3 className="py-3">
                Our Team:
            </h3>
            <div>
                Luc van Ogtrop <Link to="https://www.linkedin.com/in/luc-van-ogtrop" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                Daan Meijneken <Link to="https://daan.meijneken.nl/" target="_blank" className="underline"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link> <Link to="https://www.linkedin.com/in/daan-meijneken" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                Steven Hoekstra <Link to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                Ian van der Werf <Link to="https://www.linkedin.com/in/ian-vd-werf/" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                Thomas Middelbos <Link to="https://www.linkedin.com/in/thomas-middelbos/" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link><br />
                <Link to="https://www.jeroenvdg.com/" target="_blank">Jeroen van de Geest </Link><Link to="https://www.jeroenvdg.com" target="_blank" className="underline"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link> <Link to="https://www.linkedin.com/in/jeroen-van-de-geest" target="_blank" className="underline"><FontAwesomeIcon icon={faLinkedin} /></Link> <Link to="https://github.com/JeroenoBoy" target="_blank" className="underline"><FontAwesomeIcon icon={faGithub} /></Link><br />
            </div>
           </div>
           <div className="my-auto">
               <img src="/src/assets/ScrumdappLogoTransparent.webp" alt="scrumdapp-logo" className="mx-auto" />
           </div>
        </div>
    )
}