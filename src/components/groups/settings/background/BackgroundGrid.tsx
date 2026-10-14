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
    <div className="background-container grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pt-2 max-h-[calc(100dvh-14rem)] overflow-y-auto mb-4">
      {backgrounds.map((id) => (
        <div key={id}>
          <BackgroundTile key={id} id={id} handleUpdate={handleUpdate} />
        </div>
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
    <div className="relative w-32 sm:w-48 md:w-64 aspect-4/3 overflow-hidden rounded-lg">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-bg2/30" />
      )}

      <img
        src={`/backgrounds/thumbnails/${id}.webp`}
        alt={t("settings.background.alt")}
        className="inset-0 h-full max-w-full object-cover transition-opacity duration-300"
        onLoad={() => setIsLoaded(true)}
      />

      <div className="absolute right-1 bottom-1 md:right-4 md:bottom-4">
        <button
          className="btn border bg-bg_h"
          aria-label={`apply background ${id}`}
          onClick={() => handleUpdate(id)}
        >
          {t("settings.background.modal.apply")}
        </button>
      </div>
    </div>
  );
}
