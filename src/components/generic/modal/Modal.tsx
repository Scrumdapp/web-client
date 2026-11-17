import { useEffect, useId, useRef } from "react";
import { ModalState } from "../../../js/hooks/useModalState.ts";
import ModalContext, {
  ModalTitleIdContext,
} from "./components/ModalContext.tsx";
import { cn } from "../../../js/utils/tw.ts";

interface ModalProps {
  state: ModalState;
  backgroundClickClose?: boolean;
  children: React.ReactNode;
  className?: string;
  dialogClassName?: string;
  ariaLabel?: string;
}

export default function Modal({
  state,
  backgroundClickClose = true,
  children,
  className,
  dialogClassName,
  ariaLabel,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (ref.current == null) return;
    if (!state.isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = ref.current;

    dialog.showModal();
    return () => {
      dialog.close();
      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  return (
    <ModalContext.Provider value={state}>
      <ModalTitleIdContext.Provider value={titleId}>
        <dialog
          className={cn(
            "flex backdrop-blur-lg bg-[unset] w-full h-full max-w-screen max-h-screen",
            dialogClassName,
          )}
          aria-labelledby={ariaLabel ? undefined : titleId}
          aria-label={ariaLabel}
          onClick={() => backgroundClickClose && state.close()}
          onClose={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key !== "Escape" || e.defaultPrevented) return;
            e.preventDefault();
            if (backgroundClickClose) state.close();
          }}
          closedby="none"
          ref={ref}
          open={false}
        >
          <div
            className={cn(
              "m-auto bg-bg_h rounded-lg p-4 md:p-6 max-w-[calc(100%-1rem)] md:min-w-96 border",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </dialog>
      </ModalTitleIdContext.Provider>
    </ModalContext.Provider>
  );
}
