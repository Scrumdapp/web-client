import { useMemo } from "react";
import { Tribe } from "../../../src/js/models/tribe";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TribeCard } from "./TribeCard";
import { CollapsibleCardGrid } from "./CollapsibleCardGrid";

export function TribeLists({
  tribes,
  search,
}: {
  tribes: Tribe[];
  search: string;
}) {
  const { t } = useTranslation();
  const query = search.trim().toLowerCase();

  const { active, archived } = useMemo(() => {
    const active: Tribe[] = [];
    const archived: Tribe[] = [];

    for (const tribe of tribes) {
      if (query && !tribe.name.toLowerCase().includes(query)) continue;
      (tribe.is_active ? active : archived).push(tribe);
    }
    return { active, archived };
  }, [tribes, query]);

  const onlyArchivedMatches =
    query !== "" && active.length === 0 && archived.length > 0;

  const renderTribe = (tribe: Tribe) => (
    <Link to={`/tribes/${tribe.id}`} className="block">
      <TribeCard tribe={tribe} />
    </Link>
  );

  return (
    <div className="vertical gap-10">
      {active.length > 0 ? (
        <ul className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
          {active.map((tribe) => (
            <li key={tribe.id}>{renderTribe(tribe)}</li>
          ))}
        </ul>
      ) : (
        !onlyArchivedMatches && (
          <p className="text-fg2">{t("tribes.notribes")}</p>
        )
      )}

      {archived.length > 0 && (
        <CollapsibleCardGrid
          title={t("tribes.archivedTitle")}
          items={archived}
          getKey={(tribe) => tribe.id}
          renderItem={renderTribe}
          autoOpen={onlyArchivedMatches}
        />
      )}
    </div>
  );
}
