import { useEffect, useRef } from "react";
import { ModalState } from "../../../js/hooks/useModalState.ts";
import ModalContext from "./components/ModalContext.tsx";
import { cn } from "../../../js/utils/tw.ts";

interface ModalProps {
  state: ModalState;
  backgroundClickClose?: boolean;
  children: React.ReactNode;
  className?: string;
  dialogClassName?: string;
}

export default function Modal({
  state,
  backgroundClickClose = true,
  children,
  className,
  dialogClassName,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog == null || !state.isOpen) return;

    else dialog.showModal();

    return () => dialog.close();
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  return (
    <ModalContext.Provider value={state}>
      <dialog
        className={cn(
          "flex backdrop-blur-lg bg-[unset] w-full h-full max-w-screen max-h-screen",
          dialogClassName,
        )}
        onClick={() => backgroundClickClose && state.close()}
        onClose={(e) => e.preventDefault()}
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
    </ModalContext.Provider>
  );
}
