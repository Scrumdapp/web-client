import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckpointNamesModal from "./CheckpointNamesModal.tsx";
import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { useApi } from "../../../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi.ts";
import { useGroup } from "../../../../js/context/group/useGroup.ts";

export default function CheckpointNames() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = useModalState();
  const group = useGroup();

  const getNames = useApi(ScrumdappApi.getCheckpointNames());
  const updateNames = useApi(ScrumdappApi.updateCheckpointNames());
  const [openCount, setOpenCount] = useState(0);

  const wantsModal = searchParams.get("modal") === "checkpointNames";

  useEffect(() => {
    getNames.runCommand(group.id);
  }, [getNames.runCommand, group.id]);

  const names = getNames.data ?? [];
  const loading = getNames.loading || (!getNames.data && !getNames.error);

  function handleOpenModal() {
    if (loading) return;
    setOpenCount((c) => c + 1);
    modal.open();
  }

  useEffect(() => {
    if (!wantsModal || loading) return;

    handleOpenModal();
    const next = new URLSearchParams(searchParams);
    next.delete("modal");
    setSearchParams(next, { replace: true });
  }, [wantsModal, loading]);

  async function handleSave(next: string[]) {
    await updateNames.runCommand(group.id, next);
    await getNames.runCommand(group.id);
  }

  return (
    <div className="card">
      <div className="flex flex-row w-full justify-between items-center">
        <h3>{t("settings.checkpointNames.header")}</h3>
        <button
          onClick={handleOpenModal}
          disabled={loading}
          className="btn btn-secondary border"
        >
          <FontAwesomeIcon icon={faPencil} />{" "}
          {t("settings.checkpointNames.edit")}
        </button>
      </div>
      <p>{t("settings.checkpointNames.description")}</p>
      <div className="pl-2 mt-1">
        {names.length > 0 ? (
          <ul className="list-disc pl-5">
            {names.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>
            <i>{t("settings.checkpointNames.noNames")}</i>
          </p>
        )}
      </div>

      <CheckpointNamesModal
        key={openCount}
        modal={modal}
        initialNames={names}
        onSave={handleSave}
      />
    </div>
  );
}
