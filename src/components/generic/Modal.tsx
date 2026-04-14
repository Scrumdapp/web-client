import * as React from "react";

type ModalProps = {
    onClose: () => void
    title: string
    children?: React.ReactNode
    actions?: React.ReactNode
}

export default function Modal({ onClose, title, children, actions }: ModalProps) {

    return (
        <div className="flex fixed inset-0 backdrop-blur-lg justify-center items-center" onClick={onClose}>
            <div className="card w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-fg mb-4">{title}</h2>
                {children}
                <div className="flex gap-2 mt-4 justify-between">
                    {actions}
                </div>
            </div>
        </div>
    )
}