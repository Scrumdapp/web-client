import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CheckpointNamesField({ value, onChange, onRemove }) {
  const { t } = useTranslation();

  return (
    <div className="flex horizontal justify-between border rounded-lg m-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("settings.checkpointNames.placeholder")}
        className="w-full write-section m-1 border-transparent!"
      />
      {onRemove && (
        <button className="btn text-red" onClick={onRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}
