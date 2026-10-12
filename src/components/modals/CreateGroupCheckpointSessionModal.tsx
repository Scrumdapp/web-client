import { ModalState } from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { useTranslation } from "react-i18next";
import { CheckpointTimeDurationDropdownMenu } from "../generic/CheckpointTimeDuration.tsx";
import { useGroup } from "../../js/context/group/useGroup.ts";
import { Link } from "react-router-dom";
import CheckpointNamesDropdown from "../groups/settings/checkpoint/CheckpointNamesDropdown.tsx";

export function CreateGroupCheckpointSessionModal({
  groupId,
  state,
  onCreated,
}: {
  groupId: number;
  state: ModalState;
  onCreated?: (session: GroupCheckpointSession) => void;
}) {
  const { t } = useTranslation();
  const [checkpointName, setCheckpointName] = useState("");
  const [expireMinutes, setExpireMinutes] = useState(15);
  const createCheckpointSession = useApi(
    ScrumdappApi.createCheckpointSessions(),
  );

  const handleCreate = async () => {
    if (!checkpointName.trim()) return;

    const session = await createCheckpointSession.runCommand(groupId, {
      name: checkpointName,
      duration: expireMinutes,
    });

    onCreated?.(session);
    setCheckpointName("");
    state.accept();
  };

  const [names, setNames] = useState<string[]>([]);
  const [isLoadingNames, setIsLoadingNames] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/${groupId}/sessions/names`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: string[]) => {
        if (!cancelled) setNames(data);
      })
      .catch((err) => {
        console.error("Failed to load checkpoint names", err);
        if (!cancelled) setNames([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingNames(false);
      });

    return () => {
      cancelled = true;
    };
  }, [groupId]);

  const hasNames = names.length > 0;

  const group = useGroup();

  return (
    <Modal state={state}>
      <div className="space-y-5">
        <ModalHeadText>{t("checkpoint.modal.newcheckpoint")}</ModalHeadText>
        <div className="horizontal flex-1 gap-2">
          <CheckpointNamesDropdown
            names={names}
            value={checkpointName}
            onChange={setCheckpointName}
            disabled={isLoadingNames || !hasNames}
          />
          <CheckpointTimeDurationDropdownMenu
            value={expireMinutes}
            onChange={(v) => setExpireMinutes(v ?? 15)}
          />
        </div>
        {!isLoadingNames && !hasNames && (
          <p className="text-red text-sm">
            {t("checkpoint.modal.error")}
            <Link
              className="text-link text-sm underline"
              to={`/groups/${group.id}/settings?modal=checkpointNames`}
            >
              {t("checkpoint.modal.errorLink")}
            </Link>
          </p>
        )}
        <ModalActionRow>
          <ModalCancelButton />
          <button
            className={`btn btn-secondary border ${!checkpointName ? "opacity-50 cursor-not-allowed!" : ""}`}
            disabled={!checkpointName.trim() || createCheckpointSession.loading}
            onClick={handleCreate}
          >
            <FontAwesomeIcon icon={faCheck} className="icon" />
            {createCheckpointSession.loading ? (
              <LoadScreen />
            ) : (
              t("checkpoint.modal.create")
            )}
          </button>
        </ModalActionRow>
      </div>
    </Modal>
  );
}
