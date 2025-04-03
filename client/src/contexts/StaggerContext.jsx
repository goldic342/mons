import { createContext, useRef } from "react";
import { useCtx } from "../hooks/useCtx";

const StaggerContext = createContext(null);

export const useStagger = () => {
  const context = useCtx(StaggerContext, "Stagger");
  return context;
};

export const StaggerProvider = ({ children }) => {
  const delayRef = useRef(0);

  const addDelay = (v) => {
    const current = delayRef.current;
    delayRef.current += v;
    return current;
  };

  return (
    <StaggerContext.Provider value={{ addDelay }}>
      {children}
    </StaggerContext.Provider>
  );
};
