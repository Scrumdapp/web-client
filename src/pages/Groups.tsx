import Modal from "../components/generic/modal/Modal.tsx";
import {useModalState} from "../js/hooks/useModalState.ts";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalHeadText from "../components/generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../components/generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../components/generic/modal/components/ModalCancelButton.tsx";
import {useState} from "react";
import {LoadScreen} from "../components/generic/LoadScreen.tsx";
import {useApi} from "../js/hooks/api/useApi.ts";
import {ScrumdappApi} from "../js/hooks/api/scrumdappApi.ts";
import {GroupTile} from "../components/groups/GroupTile.tsx";
import {useApiComponent} from "../js/hooks/api/useApiComponent.tsx";
import {Link} from "react-router-dom";

export default function Groups() {

    const modal = useModalState();
    const [name, setName] = useState("")
    const createGroup = useApi(ScrumdappApi.createGroup());
    const GetGroups = useApiComponent(ScrumdappApi.getGroups());
    const [search, setSearch] = useState("");

    return (
        <div>
        <div className="app-container horizontal justify-between">
            <h2>Scrumdapp</h2>
                <div className="w-20 horizontal center align-top ">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="p-2"
                    />
                <input
                    type="text"
                    placeholder="Search for groups"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="write-section"
                />
                </div>
            <button className="btn btn-red border max-h-fit"
                onClick={modal.open}>
                    New Group <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal state={modal}>
                <ModalHeadText>New Group</ModalHeadText>
                <form id="create-group-form"
                    onSubmit={(e) => {e.preventDefault();

                        if (createGroup.loading) return;

                        createGroup
                            .runCommand({ name })
                            .then(() => {
                                modal.close();
                        });
                    }}>
                    <input
                        type="text"
                        placeholder="Group Name"
                        className="write-section mb-4 w-full!"
                        value={name}
                        maxLength={30}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </form>
                <ModalActionRow>
                    <ModalCancelButton/>
                    <button
                        type="submit"
                        form="create-group-form"
                        disabled={!name}
                        className={`btn border ${!name ? "opacity-50 cursor-not-allowed!" : ""}`}
                    >
                        {createGroup.loading ? <LoadScreen /> : "Submit"}
                    </button>
                </ModalActionRow>
            </Modal>
        </div>
            <div className="flex flex-wrap gap-4 app-container justify-evenly">
                <GetGroups input={[]}>
                {(groups) => {
                    const filteredGroups = groups.filter((group) =>
                        group.name.toLowerCase().includes(search.toLowerCase().trim())
                    );

                    return(
                    <>
                        {filteredGroups.length === 0 && (
                            <p className="text-fg">No groups have been found...</p>
                        )}
                        {filteredGroups.map((group) => (
                            <Link key={group.id} to={`/groups/${group.id}`} className="block w-[30%]">
                                <GroupTile group={group} />
                            </Link>
                        ))}
                    </>
                )}}
                </GetGroups>
            </div>
        </div>
    )
}