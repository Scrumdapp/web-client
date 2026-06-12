import {Link} from "react-router-dom";

export default function Privacy() {
    return (
        <div className="app-container">
            <div className="card text-block">
                <h1>Privacy:</h1>
                <h2>What personal information do we collect?</h2>
                <p>
                    To ensure that Scrumdapp functions we store the following personal information upon logging in:
                </p>
                <ul>
                    <li>Full name</li>
                    <li>Discord user identifier</li>
                    <li>Link to public Discord avatar</li>
                </ul>

                <h2>Why do we collect this information?</h2>
                <p>We use the information mentioned above for the following goals:</p>
                <ul>
                    <li>To identify & authorize users</li>
                    <li>To ensure we can deliver our services</li>
                </ul>

                <h2>Which personal information is visible to others</h2>
                <p>Your name is visible for other users whenever you're in a group with them.</p>

                <h2>Lifetime personal information</h2>
                <p>We avoid storing your personal information longer than necessary in order to complete the above mentioned goals.</p>

                <h2>Sharing data with third parties</h2>
                <p>We don't share your personal information to any third party.
                Information may be shared with your explicit approval or due to legal obligations.</p>

                <h2>Usage of cookies or similar technologies</h2>
                <p>We use cookies in our services. These cookies are purely functional and strictly necessary to deliver our services.</p>

                <h2>Viewing, modifying & deleting your information</h2>
                <p>You have the right to see, adjust and delete your personal information.
                In addition, you have the right to lodge an objection against the use and/or processing of your personal information by Scrumdapp.</p>

                <h2>How we protect personal information</h2>
                <p>We take fitting measures to protect your personal information against malicious use, theft and loss.
                To do this we use a combination of the following measures: </p>
                <ul>
                    <li>TLS/HTTPS: All (sub-)domains in use by Scrumdapp provide a valid, strong encrypted ssl-certificate</li>
                    <li>Firewall: Scrumdapp is hosted behind firewalls maintained by the University of applied sciences Utrecht</li>
                    <li>Databases: All information and backups of this information are stored on databases hosted within the Open-ICT cloud environment</li>
                </ul>
                
                <h2>Questions & Complaints</h2>
                <p>If you have questions about this privacy notice, your personal information or how Scrumdapp handles information. Please reach out at:
                    <Link className="text-link" target="_blank" to="mailto:info@scrumdapp.com"> info@scrumdapp.com </Link>
                    or on
                    <Link className="text-link" target="_blank" to="https://scrumdapp.com/#Contact"> our contact page</Link>.
                </p>
            </div>
        </div>
    )
}