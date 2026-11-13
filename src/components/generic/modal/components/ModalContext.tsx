import * as React from "react";
import { useModalState } from "../../../../js/hooks/useModalState.ts";

const ModalContext = React.createContext<ReturnType<
  typeof useModalState
> | null>(null);

export const ModalTitleIdContext = React.createContext<string | undefined>(
  undefined,
);

export default ModalContext;
