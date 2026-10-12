import Modal from "../../../generic/modal/Modal.tsx";
import ModalHeadText from "../../../generic/modal/components/ModalHeadText.tsx";
import { useTranslation } from "react-i18next";
import CheckpointNamesField, {
  CHECKPOINT_NAME_REGEX,
} from "./CheckpointNamesField.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { useState } from "react";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalActionRow from "../../../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../../../generic/modal/components/ModalCancelButton.tsx";

const MAX_CHECKPOINT_NAMES = 10;

type Props = {
  modal: ReturnType<typeof useModalState>;
  initialNames: string[];
  onSave: (names: string[]) => Promise<void>;
};

type Field = { id: string; value: string };

const makeField = (value = ""): Field => ({ id: crypto.randomUUID(), value });

export default function CheckpointNamesModal({
  modal,
  initialNames,
  onSave,
}: Props) {
  const { t } = useTranslation();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const [fields, setFields] = useState<Field[]>(() =>
    initialNames.length > 0
      ? initialNames.map((n) => makeField(n))
      : [makeField()],
  );
  const [focusId, setFocusId] = useState<string | null>(null);

  const handleAdd = () => {
    if (fields.length >= MAX_CHECKPOINT_NAMES) return;
    const id = crypto.randomUUID();
    setFields((prev) => [...prev, { id, value: "" }]);
    setFocusId(id);
  };

  const handleChange = (id: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));

  const handleRemove = (id: string) =>
    setFields((prev) => prev.filter((f) => f.id !== id));

  async function handleDone() {
    const names = fields.map((f) => f.value.trim()).filter(Boolean);
    if (names.some((n) => !CHECKPOINT_NAME_REGEX.test(n))) return;

    setSaving(true);
    setError(false);
    try {
      await onSave(names);
      modal.close();
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal state={modal}>
      <ModalHeadText>{t("settings.checkpointNames.editHeader")}</ModalHeadText>
      <div className="flex vertical my-3">
        {fields.map((field) => (
          <CheckpointNamesField
            key={field.id}
            value={field.value}
            onChange={(value) => handleChange(field.id, value)}
            onRemove={() => handleRemove(field.id)}
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
      {error && (
        <p className="text-red text-sm mb-4">
          {t("settings.checkpointNames.saveError")}
        </p>
      )}
      <ModalActionRow>
        <ModalCancelButton />
        <button
          onClick={handleDone}
          disabled={saving}
          className="btn border btn-secondary"
        >
          <FontAwesomeIcon icon={faCheck} /> {t("invite.modal.done")}
        </button>
      </ModalActionRow>
    </Modal>
  );
}
