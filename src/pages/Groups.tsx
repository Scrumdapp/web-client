import { useModalState } from "../js/hooks/useModalState.ts";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { GroupCard } from "../components/groups/GroupCard.tsx";
import { useApiComponent } from "../js/hooks/api/useApiComponent.tsx";
import { Link } from "react-router-dom";
import { IconInput } from "../components/generic/IconInput.tsx";
import { CreateGroupModal } from "../components/modals/CreateGroupModal.tsx";
import { useUser } from "../js/context/user/useUser.ts";
import { ShowIf } from "../components/utility/Conditional.tsx";
import { hasRole, Role } from "../js/utils/userPermissions.ts";

export default function Groups() {
    const user = useUser()
    const modal = useModalState();
    const [search, setSearch] = useState("");
    const GetGroupsComponent = useApiComponent(ScrumdappApi.getGroups());

    useEffect(() => {
        modal.onAccepted(() => {
            console.log("closed")
            GetGroupsComponent.refresh()
        })
        modal.onClosed(() => {
            console.log("closed")
            GetGroupsComponent.refresh()
        })
    }, [])

    return (
        <div className="app-container vertical gap-4">
            <div className="horizontal justify-between">
                <h1 className="flex-1">Scrumdapp</h1>
                <div className="flex-1 horizontal center align-top">
                    <IconInput
                        icon={faMagnifyingGlass}
                        type="text"
                        placeholder="Search for groups"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        alt="Search here for diffrent groups"
                        className="bg-bg_h"
                    />
                </div>
                <div className="flex-1">
                    <ShowIf condition={hasRole(user, Role.Coach)}>
                        <button className="ml-auto btn btn-red border max-h-fit"
                            onClick={modal.open}>
                            New Group <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </ShowIf>
                </div>
            </div>
            <ul className="grid gap-4 grid-cols-3 justify-center">
                <GetGroupsComponent input={[]}>
                    {(groups) => {
                        const filteredGroups = groups.filter((group) =>
                            group.name.toLowerCase().includes(search.toLowerCase().trim())
                        );

                        return (
                            <>
                                {filteredGroups.length === 0 && (
                                    <p className="text-fg">No groups have been found...</p>
                                )}
                                {filteredGroups.map((group) => (
                                    <li key={group.id}>
                                        <Link to={`/groups/${group.id}`} className="block">
                                            <GroupCard group={group} />
                                        </Link>
                                    </li>

                                ))}
                            </>
                        )
                    }}
                </GetGroupsComponent>
            </ul>
            <ShowIf condition={hasRole(user, Role.Coach)}>
                <CreateGroupModal state={modal} />
            </ShowIf>
        </div>
    )
}
