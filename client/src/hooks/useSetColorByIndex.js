import { useEffect } from "react";
import { HEADER_COLORS_MAP } from "../components/ui/uiConfig";
import { useHeader } from "../contexts/HeaderContext";
import { useScroll } from "../contexts/ScrollContext";

export const useSetColorByIndex = () => {
  const { currentSectionIndex } = useScroll();
  const { setColor } = useHeader();

  const color = HEADER_COLORS_MAP[currentSectionIndex] || "white";

  useEffect(() => {
    setColor(color);
  }, [color, setColor]);

  return color;
};
