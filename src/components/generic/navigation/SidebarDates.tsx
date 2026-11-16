import { Link } from "react-router-dom";
import { ScrumdappApi } from "../../../js/hooks/api/scrumdappApi";
import { useApiComponent } from "../../../js/hooks/api/useApiComponent";
import { useTranslation } from "react-i18next";
import { SidebarScope } from "../../../constants/navigation";

export function SidebarDates({
  scope,
  entityId,
}: {
  scope: SidebarScope;
  entityId: number;
}) {
  const { t } = useTranslation();
  const GetDatesApiComponent = useApiComponent(
    scope === "tribe"
      ? ScrumdappApi.getRecentTribeCheckpointDates()
      : ScrumdappApi.getRecentCheckpointDates(),
  );

  return (
    <div className="card vertical gap-1 text-center">
      <span>{t("navigation.sidebar.recent")}</span>
      <hr className="text-gray my-2" />
      <GetDatesApiComponent input={[entityId, 5]}>
        {(dates) =>
          dates.dates.map((date) => (
            <Link
              key={date.date}
              to={`/${scope === "tribe" ? "tribes" : "groups"}/${entityId}?date=${date.date}`}
              className="btn text-gray! py-1!"
            >
              {date.date}
            </Link>
          ))
        }
      </GetDatesApiComponent>
    </div>
  );
}
