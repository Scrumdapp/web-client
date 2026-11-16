import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { ScrumdappApi } from "../../js/hooks/api/scrumdappApi.ts";
import { LoadScreen } from "../../components/generic/LoadScreen.tsx";
import { useApi } from "../../js/hooks/api/useApi.ts";
import { useUser } from "../../js/context/user/useUser.ts";
import { ErrorScreen } from "../../components/generic/ErrorScreen.tsx";
import { Tribe } from "../../js/models/tribe.ts";
import { ModalState } from "../../js/hooks/useModalState.ts";
import { useTranslation } from "react-i18next";

export function TribeCheckpointPage({
  tribe,
  date,
  currentDate,
  modal,
}: {
  tribe: Tribe;
  date: string;
  currentDate: string;
  modal: ModalState;
}) {
  const { t } = useTranslation();

  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  const prevDate = toScrumdappDate(prev);

  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  const nextDate = toScrumdappDate(next);

  return <div className="space-y-3">Conrtent</div>;
}
