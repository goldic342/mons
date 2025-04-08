import { useEffect } from "react";
import { HEADER_COLORS_MAP } from "../components/ui/uiConfig";
import { useHeader } from "../contexts/HeaderContext";
import { useScroll } from "../contexts/ScrollContext";

export const useSetHeaderByIndex = () => {
  const { currentSectionIndex } = useScroll();
  const { setColor, setLogo } = useHeader();

  const value = HEADER_COLORS_MAP[currentSectionIndex] || null;

  useEffect(() => {
    setColor(value.color);
    setLogo(value.logo);
  }, [value, setColor, setLogo]);

  return value;
};
