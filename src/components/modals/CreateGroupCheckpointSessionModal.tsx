import { ModalState } from "../../js/hooks/useModalState.ts";
import Modal from "../generic/modal/Modal.tsx";
import ModalHeadText from "../generic/modal/components/ModalHeadText.tsx";
import ModalActionRow from "../generic/modal/components/ModalActionRow.tsx";
import ModalCancelButton from "../generic/modal/components/ModalCancelButton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { GroupCheckpointSession } from "../../js/models/checkpoint.ts";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { LoadScreen } from "../generic/LoadScreen.tsx";
import { useTranslation } from "react-i18next";
import { CheckpointTimeDurationDropdownMenu } from "../generic/CheckpointTimeDuration.tsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
  const [showWarning] = useState(false);
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

  return (
    <Modal state={state}>
      <div className="space-y-5">
        <ModalHeadText>{t("checkpoint.modal.newcheckpoint")}</ModalHeadText>
        <div className="horizontal flex-1 gap-2">
          <Menu as="div" className="relative w-full">
            <MenuButton className="btn-attendance border cursor-pointer h-10.5!">
              <span
                className={`truncate ${checkpointName ? "opacity-100" : "opacity-50"}`}
              >
                {checkpointName || t("checkpoint.modal.name")}
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="shrink-0" />
            </MenuButton>
            <MenuItems
              transition
              className="absolute z-10 mt-2 border rounded-md bg-bg w-full py-1"
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  as="button"
                  type="button"
                  onClick={() => setCheckpointName(name)}
                  className="py-1 btn-attendance-dropdown"
                >
                  {name}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <CheckpointTimeDurationDropdownMenu
            value={expireMinutes}
            onChange={(v) => setExpireMinutes(v ?? 15)}
          />
        </div>
        {!isLoadingNames && !hasNames && (
          <p className="text-red text-sm">{t("checkpoint.modal.error")}</p>
        )}
        {showWarning && (
          <p className="text-red text-sm">{t("checkpoint.modal.error")}</p>
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
