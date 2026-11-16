import { useRef, ReactNode, useEffect } from "react";
import { StompdappClient, stompdappContext } from "./stompdappContext";
import { WebConfig } from "../../config";

export function StompdappProvider({ children }: { children: ReactNode }) {
  const ref = useRef(new StompdappClient(`${WebConfig.apiUrl}/ws`, {}));

  useEffect(() => {
    ref.current.init();
    return () => ref.current.cleanup();
  }, []);

  return (
    <stompdappContext.Provider value={ref.current}>
      {children}
    </stompdappContext.Provider>
  );
}
