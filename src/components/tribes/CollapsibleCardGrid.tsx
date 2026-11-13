import { useState, ReactNode, Key } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../js/utils/tw";

type Props<T> = {
  title: string;
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  autoOpen?: boolean;
};

export function CollapsibleCardGrid<T>({
  title,
  items,
  getKey,
  renderItem,
  autoOpen = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [prevAutoOpen, setPrevAutoOpen] = useState(autoOpen);

  if (autoOpen !== prevAutoOpen) {
    setPrevAutoOpen(autoOpen);
    if (autoOpen) setOpen(true);
  }

  return (
    <section>
      <h2 className="mb-2">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-6 cursor-pointer"
        >
          {title} <span className="text-base text-fg3">({items.length})</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>

      <div
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul className="overflow-hidden grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
