import {useUser} from "../js/context/user/useUser.ts";

export default function Test() {
    const user = useUser();

    return (
            <div className="p-3 text-center mx-auto">
                <h1>Gegroet Amice {user.last_name}</h1>
            </div>
    )
}