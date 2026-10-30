import { useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi";
import { useApi } from "../../js/hooks/api/useApi";
import { ModalState } from "../../js/hooks/useModalState";
import ModalActionRow from "../generic/modal/components/ModalActionRow";
import ModalHeadText from "../generic/modal/components/ModalHeadText";
import Modal from "../generic/modal/Modal";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton";
import { LoadScreen } from "../generic/LoadScreen";
import { useTranslation } from "react-i18next";
import { FieldApiErrorMessage } from "../generic/FieldApiErrorMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export function CreateGroupModal({ state }: { state: ModalState }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const createGroupCommand = useApi(ScrumdappApi.createGroup());

  return (
    <Modal state={state} className="mx-auto max-w-xs">
      <ModalHeadText>{t("groups.newgroup")}</ModalHeadText>
      <form
        id="create-group-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (createGroupCommand.loading) return;

          createGroupCommand.runCommand({ name }).then(() => {
            state.close();
          });
        }}
      >
        <input
          type="text"
          placeholder={t("groups.creategroup")}
          alt={t("groups.creategroup")}
          className="write-section mb-4 w-full!"
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FieldApiErrorMessage
          errors={createGroupCommand.error?.errors ?? null}
          field="name"
        />
      </form>

      <ModalActionRow>
        <ModalCancelButton />
        <button
          type="submit"
          form="create-group-form"
          disabled={!name}
          className="btn border btn-secondary"
        >
            {createGroupCommand.loading ? (
                <LoadScreen />
            ) : (
                <>
                    <FontAwesomeIcon icon={faCheck} /> {t("groups.submit")}
                </>
            )}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
