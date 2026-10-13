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

  const getCheckpointNames = useApi(ScrumdappApi.getCheckpointNames());

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

  useEffect(() => {
    getCheckpointNames.runCommand(groupId);
  }, [getCheckpointNames.runCommand, groupId]);

  const names = getCheckpointNames.data ?? [];

  const isLoadingNames =
    getCheckpointNames.loading ||
    (!getCheckpointNames.data && !getCheckpointNames.error);
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
        {isLoadingNames && <LoadScreen />}
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
