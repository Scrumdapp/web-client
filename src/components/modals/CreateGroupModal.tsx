import { useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";
import { useApi } from "../../js/hooks/api/useApi";
import { ModalState } from "../../js/hooks/useModalState";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import Modal from "../generic/modal/Modal";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import { LoadScreen } from "../generic/LoadScreen";

export function CreateGroupModal({ state }: { state: ModalState }) {
  const [name, setName] = useState("")
  const createGroupCommand = useApi(ScrumdappApi.createGroup());

  return (
    <Modal state={state}>
      <ModalHeadText>New Group</ModalHeadText>
      <form id="create-group-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (createGroupCommand.loading) return;

          createGroupCommand
            .runCommand({ name })
            .then(() => {
              state.close();
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
        <ModalCancelButton />
        <button
          type="submit"
          form="create-group-form"
          disabled={!name}
          className={`btn border ${!name ? "opacity-50 cursor-not-allowed!" : ""}`}
        >
          {createGroupCommand.loading ? <LoadScreen /> : "Submit"}
        </button>
      </ModalActionRow>
    </Modal>
  )
}
