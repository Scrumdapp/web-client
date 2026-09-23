import { useEffect, useState } from "react";

export function useBrowserFocus() {
  const [focussed, setFocussed] = useState(document.hasFocus());

  useEffect(() => {
    const onFocus = () => {
      setFocussed(true);
    };

    const onBlur = () => {
      setFocussed(false);
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return focussed;
}
