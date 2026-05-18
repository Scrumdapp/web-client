import { useModalState } from "../js/hooks/useModalState.ts";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ScrumdappApi } from "../js/hooks/api/scrumdappApi.ts";
import { GroupCard } from "../components/groups/GroupCard.tsx";
import { useApiComponent } from "../js/hooks/api/useApiComponent.tsx";
import { Link } from "react-router-dom";
import { IconInput } from "../components/generic/IconInput.tsx";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { CreateGroupModal } from "../components/modals/CreateGroupModal.tsx";

export default function Groups() {

    const modal = useModalState();
    const [search, setSearch] = useState("");
    const GetGroups = useApiComponent(ScrumdappApi.getGroups());

    return (
        <div className="app-container vertical gap-4">
            <div className="horizontal justify-between">
                <h1>Scrumdapp</h1>
                <div className="w-20 horizontal center align-top ">
                    <IconInput
                        icon={faMagnifyingGlass}
                        type="text"
                        placeholder="Search for groups"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        alt="Search here for diffrent groups"
                    />
                </div>
                <button className="btn btn-red border max-h-fit"
                    onClick={modal.open}>
                    New Group <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul className="grid gap-4 grid-cols-3 justify-center">
                <GetGroups input={[]}>
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
                </GetGroups>
            </ul>
            <CreateGroupModal state={modal} />
        </div>
    )
}
