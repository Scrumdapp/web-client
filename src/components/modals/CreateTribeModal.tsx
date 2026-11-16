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

export function CreateTribeModal({ state }: { state: ModalState }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const createTribeCommand = useApi(ScrumdappApi.createTribe());

  return (
    <Modal state={state} className="mx-auto max-w-xs">
      <ModalHeadText>{t("tribes.newtribe")}</ModalHeadText>
      <form
        id="create-tribe-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (createTribeCommand.loading) return;

          createTribeCommand.runCommand({ name }).then(() => {
            state.close();
          });
        }}
      >
        <input
          type="text"
          placeholder={t("tribes.createtribe")}
          alt={t("tribes.createtribe")}
          className="write-section mb-4 w-full!"
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FieldApiErrorMessage
          errors={createTribeCommand.error?.errors ?? null}
          field="name"
        />
      </form>

      <ModalActionRow>
        <ModalCancelButton />
        <button
          type="submit"
          form="create-tribe-form"
          disabled={!name}
          className="btn border btn-secondary"
        >
          {createTribeCommand.loading ? (
            <LoadScreen />
          ) : (
            <>
              <FontAwesomeIcon icon={faCheck} /> {t("tribes.submit")}
            </>
          )}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
