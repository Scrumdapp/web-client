import { useTranslation } from "react-i18next";
import Modal from "../../../generic/modal/Modal.tsx";
import ModalHeadText from "../../../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../../generic/modal/components/ModalCancelButton.tsx";
import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import CheckpointNamesList from "./CheckpointNamesList.tsx";
import { useState } from "react";
import CheckpointNamesField from "./CheckpointNamesField.tsx";

export default function CheckpointNames() {
  const { t } = useTranslation();
  const modal = useModalState();

  function handleOpenModal() {
    modal.open();
  }

  function handleDone() {
    modal.close();
  }

  const [fields, setFields] = useState([
    { id: crypto.randomUUID(), value: "" },
  ]);

  const handleAdd = () =>
    setFields((prev) => [...prev, { id: crypto.randomUUID(), value: "" }]);

  const handleChange = (id, value) =>
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));

  const handleRemove = (id) =>
    setFields((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="card flex flex-col">
      <div className="flex flex-row w-full justify-between items-center py-3">
        <h3>{t("settings.checkpointNames.header")}</h3>
        <button onClick={handleOpenModal} className="btn btn-secondary border">
          {t("settings.checkpointNames.edit")}
        </button>
      </div>
      <div>
        <p>{t("settings.checkpointNames.description")}</p>
      </div>
      <CheckpointNamesList />

      <Modal state={modal}>
        <ModalHeadText>{t("settings.checkpointNames.header")}</ModalHeadText>
        <div className="flex vertical my-3">
          {fields.map((field, index) => (
            <CheckpointNamesField
              key={field.id}
              value={field.value}
              onChange={(value) => handleChange(field.id, value)}
              onRemove={index > 0 ? () => handleRemove(field.id) : undefined}
            />
          ))}

          <button className="btn border mt-2" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />{" "}
            {t("settings.checkpointNames.add")}
          </button>
        </div>
        <ModalActionRow>
          <ModalCancelButton />
          <button onClick={handleDone} className="btn border btn-secondary">
            <FontAwesomeIcon icon={faCheck} /> {t("invite.modal.done")}
          </button>
        </ModalActionRow>
      </Modal>
    </div>
  );
}
