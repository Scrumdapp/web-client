import { useTranslation } from "react-i18next";
import Modal from "../../../generic/modal/Modal.tsx";
import ModalHeadText from "../../../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../../generic/modal/components/ModalCancelButton.tsx";
import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import CheckpointNamesField, {
  CHECKPOINT_NAME_REGEX,
} from "./CheckpointNamesField.tsx";
import {useSearchParams} from "react-router-dom";

export default function CheckpointNames() {
  const {t} = useTranslation();
  const modal = useModalState();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleOpenModal() {
    setFocusId(null);
    setFields(
        savedNames.length > 0
            ? savedNames.map((value) => ({id: crypto.randomUUID(), value}))
            : [{id: crypto.randomUUID(), value: ""}],
    );
    modal.open();
  }

  function handleDone() {
    const names = fields.map((f) => f.value.trim()).filter(Boolean);
    if (names.some((n) => !CHECKPOINT_NAME_REGEX.test(n))) return; // invalid input, keep modal open
    setSavedNames(names);
    modal.close();
  }

  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [fields, setFields] = useState([
    {id: crypto.randomUUID(), value: ""},
  ]);

  const [focusId, setFocusId] = useState<string | null>(null);

  const handleAdd = () => {
    if (fields.length >= MAX_CHECKPOINT_NAMES) return;
    const id = crypto.randomUUID();
    setFields((prev) => [...prev, {id, value: ""}]);
    setFocusId(id);
  };

  const handleChange = (id: string, value: string) =>
      setFields((prev) => prev.map((f) => (f.id === id ? {...f, value} : f)));

  const handleRemove = (id: string) =>
      setFields((prev) => prev.filter((f) => f.id !== id));

  const MAX_CHECKPOINT_NAMES = 10;

  const wantsModal = searchParams.get("modal") === "checkpointNames";

  useEffect(() => {
    if (!wantsModal) return;

    handleOpenModal();
    const next = new URLSearchParams(searchParams);
    next.delete("modal");
    setSearchParams(next, {replace: true});
  }, [wantsModal]);

  return (
    <div className="card">
      <div className="flex flex-row w-full justify-between items-center">
        <h3>{t("settings.checkpointNames.header")}</h3>
        <button onClick={handleOpenModal} className="btn btn-secondary border">
          <FontAwesomeIcon icon={faPencil} />{" "}
          {t("settings.checkpointNames.edit")}
        </button>
      </div>
      <p>{t("settings.checkpointNames.description")}</p>
      <div className="pl-2 mt-1">
        {savedNames.length > 0 ? (
          <ul className="list-disc pl-5">
            {savedNames.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>
            <i>{t("settings.checkpointNames.noNames")}</i>
          </p>
        )}
      </div>

      <Modal state={modal}>
        <ModalHeadText>
          {t("settings.checkpointNames.editHeader")}
        </ModalHeadText>
        <div className="flex vertical my-3">
          {fields.map((field) => (
            <CheckpointNamesField
              key={field.id}
              value={field.value}
              onChange={(value) => handleChange(field.id, value)}
              onRemove={
                fields.length >= 2 ? () => handleRemove(field.id) : undefined
              }
              autoFocus={field.id === focusId}
            />
          ))}

          {fields.length < MAX_CHECKPOINT_NAMES && (
            <button className="btn border mt-2 m-1" onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} />{" "}
              {t("settings.checkpointNames.add")}
            </button>
          )}
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
