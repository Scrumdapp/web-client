import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckpointNamesModal from "./CheckpointNamesModal.tsx";
import { useModalState } from "../../../../js/hooks/useModalState.ts";
import { useApi } from "../../../../js/hooks/api/useApi.ts";
import { ScrumdappApi } from "../../../../js/hooks/api/scrumdappApi.ts";
import { useGroup } from "../../../../js/context/group/useGroup.ts";
import { ErrorScreen } from "../../../generic/ErrorScreen.tsx";
import { LoadScreen } from "../../../generic/LoadScreen.tsx";

export default function CheckpointNames() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = useModalState();
  const group = useGroup();

  const getNames = useApi(ScrumdappApi.getCheckpointNames(), {
    fetchOnCreated: [group.id],
  });

  const [openCount, setOpenCount] = useState(0);

  const wantsModal = searchParams.get("modal") === "checkpointNames";
  const names = getNames.data?.checkpointNames ?? [];

  const handleOpenModal = () => {
    setOpenCount((c) => c + 1);
    modal.open();
  };

  useEffect(() => {
    if (!wantsModal || getNames.loading) return;
    handleOpenModal();
    const next = new URLSearchParams(searchParams);
    next.delete("modal");
    setSearchParams(next, { replace: true });
  }, [wantsModal, getNames.loading]);

  const handleSaved = async () => {
    await getNames.runCommand(group.id);
  };

  if (getNames.error != null) {
    return (
      <CheckpointNamesLayout showButton={false}>
        <ErrorScreen error={getNames.error} />
      </CheckpointNamesLayout>
    );
  }

  if (getNames.loading || !getNames.data) {
    return (
      <CheckpointNamesLayout showButton={false}>
        <LoadScreen />
      </CheckpointNamesLayout>
    );
  }

  return (
    <CheckpointNamesLayout onButtonPressed={handleOpenModal} showButton={true}>
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
        onSaved={handleSaved}
      />
    </CheckpointNamesLayout>
  );
}

export function CheckpointNamesLayout({
  showButton = true,
  onButtonPressed = () => {},
  children = null,
}: {
  showButton?: boolean;
  onButtonPressed?: () => void;
  children?: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="flex flex-row w-full justify-between items-center">
        <h3>{t("settings.checkpointNames.header")}</h3>
        {showButton && (
          <button
            onClick={onButtonPressed}
            className="btn btn-secondary border"
          >
            <FontAwesomeIcon icon={faPencil} />
            {t("settings.checkpointNames.edit")}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
