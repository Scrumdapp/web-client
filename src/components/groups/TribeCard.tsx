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
    <div className="card hover:bg-bg2! p-2 md:p-4">
      <p className="pb-1 md:pb-2">{tribe.name}</p>
      <img
        src={backgroundUrl}
        alt={t("tribes.image", { tribename: tribe.name })}
        className="aspect-4/3 object-cover h-full rounded overflow-hidden max-w-full"
      />
      <span>{t("tribes.groupCount", { count: tribe.group_count })}</span>
    </div>
  );
}
