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

export function CreateGroupModal({ state }: { state: ModalState }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const createGroupCommand = useApi(ScrumdappApi.createGroup());

  return (
    <Modal state={state} className="max-w-xs">
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
      </form>

      {createGroupCommand.error && (
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-red">
            {t(createGroupCommand.error.titleTranslationKey)}
          </h3>
          <p className="text-red">
            {t(createGroupCommand.error.descriptionTranslationKey)}
          </p>
          {createGroupCommand.error.errors &&
            createGroupCommand.error.errors.length > 0 && (
              <ul className="text-red list-disc list-inside">
                {createGroupCommand.error.errors?.map((err, idx) => (
                  <li key={idx}>{t(err.translationKey)}</li>
                ))}
              </ul>
            )}
        </div>
      )}

      <ModalActionRow>
        <ModalCancelButton />
        <button
          type="submit"
          form="create-group-form"
          disabled={!name}
          className={`btn border ${!name ? "opacity-50 cursor-not-allowed!" : ""}`}
        >
          {createGroupCommand.loading ? <LoadScreen /> : t("groups.submit")}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
