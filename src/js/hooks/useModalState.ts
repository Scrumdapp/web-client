import { useState, useCallback } from "react"

export interface ModalState {
  isOpen: boolean,
  open: () => void,
  accept: () => void,
  close: () => void,
  onAccepted: (cb: () => void) => void,
  onClosed: (cb: () => void) => void
}

export function useModalState(): ModalState {
  const [isOpen, setIsOpen] = useState(false)

  const [onAcceptCb, setOnAcceptCb] = useState<(() => void) | null>(null)
  const [onCloseCb, setOnCloseCb] = useState<(() => void) | null>(null)

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => {
    setIsOpen(false)
    onCloseCb?.()
  }, [onCloseCb])

  const accept = useCallback(() => {
    onAcceptCb?.()
    setIsOpen(false)
  }, [onAcceptCb])

  return {
    isOpen,
    open,
    close,
    accept,
    onAccepted: setOnAcceptCb,
    onClosed: setOnCloseCb,
  }
}
