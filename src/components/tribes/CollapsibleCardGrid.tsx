import { useState, ReactNode } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { cn } from "../../js/utils/tw";

type Props<T> = {
  title: string;
  noItemsText: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
};

export function CollapsibleCardGrid<T>({
  title,
  items,
  noItemsText,
  renderItem,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const hasItems = items.length > 0;

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mb-2 flex items-center gap-6 cursor-pointer"
      >
        <h2>
          {title} <span className="text-base text-fg3">({items.length})</span>
        </h2>
        {hasItems && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {hasItems ? (
        <div
          className={cn(
            "grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center transition-[grid-template-rows] duration-300 ease-in-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">{items.map(renderItem)}</div>
        </div>
      ) : (
        <p className="text-fg2">{t(noItemsText)}</p>
      )}
    </div>
  );
}
