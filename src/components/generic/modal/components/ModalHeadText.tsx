import { ReactNode, useContext } from "react";
import { ModalTitleIdContext } from "./ModalContext.tsx";

interface ModalHeadTextProps {
  children?: ReactNode;
}

export default function ModalHeadText({ children }: ModalHeadTextProps) {
  const titleId = useContext(ModalTitleIdContext);
  return (
    <h2 id={titleId} className="text-fg mb-4">
      {children}
    </h2>
  );
}
