import { PartialGroup } from "../../js/models/group.ts";
import {useApiComponent} from "../../js/hooks/api/useApiComponent.tsx";
import {ScrumdappApi} from "../../js/hooks/api/scrumdappApi.ts";

interface GroupCardProps {
    group: PartialGroup;
}

export function GroupCard({ group }: GroupCardProps) {
    const GroupUsers = useApiComponent(ScrumdappApi.getGroupUsers());

    return (
        <div className="card hover:bg-bg2!">
            <GroupUsers input={[group.id]}>
                {(users) => (
                    <p>{users.length} Users</p>
                )}
            </GroupUsers>
            <p className="text-lg pb-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-60ch">{group.name}</p>
            <img
                src="https://http.cat/images/404.jpg"
                alt="Group Image"
                className="object-cover h-full rounded overflow-hidden"
            />
        </div >
    );
}
