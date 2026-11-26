import { useState, ReactNode, Key } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../js/utils/tw";
import { Collapse } from "../generic/Collapse";

type Props<T> = {
  title: string;
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  autoOpen?: boolean;
  hasItems?: boolean;
};

export function CollapsibleCardGrid<T>({
  title,
  items,
  getKey,
  renderItem,
  autoOpen = false,
  hasItems = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [prevAutoOpen, setPrevAutoOpen] = useState(autoOpen);

  if (autoOpen !== prevAutoOpen) {
    setPrevAutoOpen(autoOpen);
    if (autoOpen) setOpen(true);
  }

  if (!hasItems) return null;

  return (
    <section>
      <h2 className="mb-2">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 cursor-pointer"
        >
          {title} <span className="text-base text-fg3">({items.length})</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>
      <Collapse open={open}>
        <ul className="grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      </Collapse>
    </section>
  );
}
