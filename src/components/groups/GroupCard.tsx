import { PartialGroup } from "../../js/models/group.ts";
import { useTranslation } from "react-i18next";

interface GroupCardProps {
  group: PartialGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  const { t } = useTranslation();
  const backgroundUrl = group.background_preference
    ? `/backgrounds/thumbnails/${group.background_preference}.webp`
    : "https://http.cat/images/404.jpg";

  return (
    <div className="card hover:bg-bg2! transition-colors p-2 md:p-4 flex gap-2">
      <img
        src={backgroundUrl}
        alt={t("group.image", { groupname: group.name })}
        className="aspect-1/1 object-cover h-full rounded overflow-hidden max-w-20"
      />
      <div>
        <p className="text-lg">{group.name}</p>

        <span className="text-sm text-fg3">
          {t("groups.memberCount", { count: group.member_count })}
        </span>
      </div>
    </div>
  );
}
