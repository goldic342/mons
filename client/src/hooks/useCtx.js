import { useContext } from "react";

export const useCtx = (contextValue, name) => {
  const context = useContext(contextValue);
  if (!context) {
    throw new Error(`use${name} must be used within an ${name}Provider`);
  }
  return context;
};
