import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function Test() {
    return (
            <div className="card h-full mx-auto w-11/12 rounded-2xl text-center p-3">
                <h1>About Scrumdapp</h1>
                <br />
                <h3>The Ultimate Stand-up manager for your project!</h3>
                <br />
                <p>Scrumdapp, aka Scrum Daily App was born out of frustration of not being able to easily manage the daily stand-ups from your team/project.
                    <br />
                    We have brought you an easy way to keep track of this using a beautyful UI and many security and privacy features in the design
                </p>
                <br />
                <h3>
                    Our Team:
                </h3>
                <p>
                    <Link to="https://www.linkedin.com/in/jeroen-van-de-geest-0b6508241/" target="_blank" className="underline">Jeroen van de Geest <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link><br />
                    <Link to="https://www.linkedin.com/" target="_blank" className="underline">Daan Meijneken <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link><br />
                    <Link to="www.linkedin.com/in/luc-van-ogtrop" target="_blank" className="underline">Luc van Ogtrop <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link><br />
                    <Link to="https://www.linkedin.com/in/never-gonna-give-you-up-never-gonna-let-you-down/" target="_blank" className="underline">Steven Hoekstra <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link><br />
                    Ian van der Werf<br />
                    <Link to="https://www.linkedin.com/in/thomas-middelbos-9b194830a/" target="_blank" className="underline">Thomas Middelbos <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Link><br />
                </p>

            </div>
    )
}