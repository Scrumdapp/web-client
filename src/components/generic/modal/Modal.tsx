import { useEffect, useRef } from "react";
import { ModalState } from "../../../js/hooks/useModalState.ts";
import ModalContext from "./components/ModalContext.tsx";
import { cn } from "../../../js/utils/tw.ts";

interface ModalProps {
    state: ModalState
    children: React.ReactNode,
    className?: string
}

export default function Modal({ state, children, className }: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (ref.current == null) return
        if (!state.isOpen) return

        ref.current.showModal()
        return () => ref.current?.close()
    }, [ref.current, state.isOpen])

    if (!state.isOpen) return null

    return (
        <ModalContext.Provider value={state}>
            <dialog
                className="flex backdrop-blur-lg bg-[unset] w-full h-full max-w-screen max-h-screen"
                onClick={state.close}
                onClose={(e) => e.preventDefault()}
                closedby="none"
                ref={ref}
                open={false}
            >
                <div
                    className={cn("m-auto bg-bg_h rounded-lg p-6 min-w-96 w-fit border", className)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </dialog>
        </ModalContext.Provider>
    )
} 
