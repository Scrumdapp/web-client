import * as React from "react"
import { ModalState } from "../../../js/hooks/useModalState.ts";
import ModalContext from "./components/ModalContext.tsx";

interface ModalProps {
  state: ModalState
  children: React.ReactNode
}

export default function Modal({ state, children }: ModalProps) {
  if (!state.isOpen) return null


  return (
    <ModalContext.Provider value={state}>
      <div
        className="flex fixed inset-0 backdrop-blur-lg justify-center items-center"
      >
        <div
          className="bg-bg_h rounded-lg p-6 min-w-96 w-fit border"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}
