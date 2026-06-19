import { PartialGroup } from "../../js/models/group.ts";
import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

interface GroupCardProps {
    group: PartialGroup;
}

export function GroupCard({ group }: GroupCardProps) {
    const GroupUsers = useApiComponent(ScrumdappApi.getGroupUsers());

    return (
        <div className="card hover:bg-bg2!">
            <p className="text-lg pb-2">{group.name}</p>
            <img src="https://http.cat/images/404.jpg" alt="Group-image" className="object-cover h-full rounded overflow-hidden" />
        </div >
    );
}
