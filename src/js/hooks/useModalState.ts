import { useState, useCallback } from "react"

export function useModalState() {
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