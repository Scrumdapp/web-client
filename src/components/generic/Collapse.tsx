import { PropsWithChildren } from "react";
import { cn } from "../../js/utils/tw";

export function Collapse({
  open,
  className,
  children,
}: PropsWithChildren<{ open: boolean; className?: string }>) {
  return (
    <div
      inert={!open}
      aria-hidden={open}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-in-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </div>
  );
}
