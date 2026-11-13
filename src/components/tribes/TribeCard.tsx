import { PartialTribe } from "../../js/models/tribe.ts";
import { useTranslation } from "react-i18next";

interface TribeCardProps {
  tribe: PartialTribe;
}

export function TribeCard({ tribe }: TribeCardProps) {
  const { t } = useTranslation();
  const backgroundUrl = tribe.background_preference
    ? `/backgrounds/thumbnails/${tribe.background_preference}.webp`
    : "https://http.cat/images/404.jpg";

  return (
    <div className="card hover:bg-bg2! transition-colors p-2 md:p-4 flex gap-2">
      <img
        src={backgroundUrl}
        alt={t("tribes.image", { tribename: tribe.name })}
        className="aspect-1/1 object-cover h-full rounded overflow-hidden max-w-20"
      />
      <div>
        <p className="text-lg">{tribe.name}</p>

        <span className="text-sm text-fg3">
          {t("tribes.groupCount", { count: tribe.group_count })} •{" "}
          {t("tribes.memberCount", { count: tribe.member_count })}
        </span>
      </div>
    </div>
  );
}
