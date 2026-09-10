import { useGroup } from "../../js/context/group/useGroup.ts";
import { useSearchParams } from "react-router-dom";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../js/utils/scrumdappDate.ts";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { GroupCheckpointPage } from "./GroupCheckpointPage";
import { useTranslation } from "react-i18next";
import CustomErrorScreen from "../../components/generic/CustomErrorScreen.tsx";

export function GroupCheckpointPageWrapper() {
  const group = useGroup();
  const modal = useModalState();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const currentDate = toScrumdappDate(new Date());
  const date = searchParams.get("date") ?? currentDate;

  let parsedDate: Date;
  try {
    parsedDate = parseScrumdappDate(date);
  } catch {
    return (
      <CustomErrorScreen
        errorTitle={t("checkpoint.invaliddate.title")}
        errorDescription={t("checkpoint.invaliddate.description")}
      />
    );
  }

  return (
    <GroupCheckpointPage
      {...{
        group,
        date,
        currentDate,
        modal,
      }}
    />
  );
}
