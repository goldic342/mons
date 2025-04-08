import { createContext, useEffect, useState } from "react";
import { useCtx } from "../hooks/useCtx";

const HeaderContext = createContext(null);

export const useHeader = () => {
  const context = useCtx(HeaderContext, "Header");
  return context;
};

export const HeaderProvider = ({ children }) => {
  const [color, setColor] = useState("white");
  const [logo, setLogo] = useState(null);

  return (
    <HeaderContext.Provider value={{ color, setColor, logo, setLogo }}>
      {children}
    </HeaderContext.Provider>
  );
};
