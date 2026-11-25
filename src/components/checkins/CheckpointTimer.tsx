import { memo } from "react";
import { useTimer } from "../../js/hooks/useTimer";
import { GroupCheckpointSession } from "../../js/models/checkpoint";
import { useTranslation } from "react-i18next";

export const CheckpointTimer = memo(
  ({
    session,
    onLocked: onStateChanged,
  }: {
    session: GroupCheckpointSession;
    onLocked?: () => void;
  }) => {
    const { t } = useTranslation();

    const timer = useTimer(
      new Date(session.startTime),
      session.duration / 1000,
      1,
      () => onStateChanged?.(),
    );

    return (
      <p className="pt-1 md:pt-0">
        {timer.completed ? (
          t("checkpoint.closed")
        ) : (
          <>
            {t("checkpoint.closesin")}{" "}
            {`${Math.floor(timer.timeLeftSec / 60)}:${Math.floor(
              timer.timeLeftSec % 60,
            )
              .toString()
              .padStart(2, "0")}`}
          </>
        )}
      </p>
    );
  },
);
