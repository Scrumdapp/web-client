import {Link} from "react-router-dom";

export default function Settings() {
    return (
        <main>
            <div className="flex flex-col border">
                <div>
                    <Link to={'invite'} className="flex float-right btn btn-secondary border">
                        Create Invite
                    </Link>
                </div>
                <div>
                    ...All Invites
                </div>
            </div>
        </main>
    )
}
