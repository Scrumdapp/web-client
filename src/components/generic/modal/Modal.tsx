import * as React from "react"
import {useModalState} from "../../../js/hooks/useModalState.ts";
import ModalContext from "./components/ModalContext.tsx";

type ModalProps = {
    state: ReturnType<typeof useModalState>
    children: React.ReactNode
}

export default function Modal({ state, children }: ModalProps) {
    if (!state.isOpen) return null

    return (
        <ModalContext.Provider value={state}>
            <div
                className="flex fixed inset-0 backdrop-blur-lg justify-center items-center"
                onClick={state.close}
            >
                <div
                    className="bg-bg_h rounded-lg p-6 w-96 border"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </ModalContext.Provider>
    )
}