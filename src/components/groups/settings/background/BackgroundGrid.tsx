import { useState } from "react";
import { useTranslation } from "react-i18next";

export function BackgroundGrid({
  backgrounds,
  handleUpdate,
}: {
  backgrounds: string[];
  handleUpdate: (id: string) => void;
}) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pt-2 pr-1 mb-4 md:grid-cols-2">
      {backgrounds.map((id) => (
        <BackgroundTile key={id} id={id} handleUpdate={handleUpdate} />
      ))}
    </div>
  );
}

function BackgroundTile({
  id,
  handleUpdate,
}: {
  id: string;
  handleUpdate: (id: string) => void;
}) {
  const { t } = useTranslation();

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full max-h-60 w-full aspect-4/3 rounded-lg">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-bg2/30" />
      )}

      <img
        src={`/backgrounds/thumbnails/${id}.webp`}
        alt={t("settings.background.alt")}
        className="inset-0 h-full w-full object-cover transition-opacity duration-300 rounded-lg"
        onLoad={() => setIsLoaded(true)}
      />

      <button
        className="btn border bg-bg_h absolute right-1 bottom-1 md:right-4 md:bottom-4"
        aria-label={`apply background ${id}`}
        onClick={() => handleUpdate(id)}
      >
        {t("settings.background.modal.apply")}
      </button>
    </div>
  );
}
