import { useTribe } from "../../js/context/tribe/useTribe.ts";
import { useSearchParams } from "react-router-dom";
import {
  parseScrumdappDate,
  toScrumdappDate,
} from "../../js/utils/scrumdappDate.ts";
import { useModalState } from "../../js/hooks/useModalState.ts";
import { TribeCheckpointPage } from "./TribeCheckpointPage.tsx";
import { useTranslation } from "react-i18next";
import CustomErrorScreen from "../../components/generic/CustomErrorScreen.tsx";
import { isDateInFuture } from "../../js/utils/timeUtils.ts";

export function TribeCheckpointPageWrapper() {
  const tribe = useTribe();
  const modal = useModalState();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const currentDate = toScrumdappDate(new Date());
  const date = searchParams.get("date") ?? currentDate;

  let parsedDate: Date;
  try {
    parsedDate = parseScrumdappDate(date);
    if (isDateInFuture(parsedDate))
      throw new Error("Date can not be in the future");
  } catch {
    return (
      <CustomErrorScreen
        errorTitle={t("checkpoint.invaliddate.title")}
        errorDescription={t("checkpoint.invaliddate.description")}
      />
    );
  }

  const parsedDateStr = toScrumdappDate(parsedDate);

  return (
    <TribeCheckpointPage
      {...{
        tribe,
        date: parsedDateStr,
        currentDate,
        modal,
      }}
    />
  );
}
