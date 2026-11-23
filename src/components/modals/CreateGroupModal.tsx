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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function CreateGroupModal({ state }: { state: ModalState }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const createGroupCommand = useApi(ScrumdappApi.createGroup());
  const nameError = "create-group-name-error";
  const hasNameError = createGroupCommand.error?.errors?.some(
    (error) => error.field === "name",
  );

  return (
    <Modal state={state}>
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
        <label className="sr-only" htmlFor="create-group-name">
          {t("groups.creategroup")}
        </label>
        <input
          id="create-group-name"
          type="text"
          placeholder={t("groups.creategroup")}
          className="write-section mb-4 w-full!"
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
          required
          aria-invalid={hasNameError || undefined}
          aria-describedby={hasNameError ? nameError : undefined}
        />
        <FieldApiErrorMessage
          errors={createGroupCommand.error?.errors ?? null}
          field="name"
          id={nameError}
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
