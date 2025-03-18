import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
} from "react";
import { MAIN_SCROLL_DURATION } from "../constants";

const ScrollContext = createContext({
  skipToSection: () => {},
  nextSection: () => {},
  prevSection: () => {},
  currentSectionIndex: 0,
});

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within an ScrollProvider");
  }
  return context;
};

export const ScrollProvider = ({
  className,
  hideOverflow = true,
  children,
}) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    setTotalSections(document.querySelectorAll('[id^="section-"]').length);
  }, [children]);

  const nextSection = () => {
    setSectionIndex((prev) => Math.min(prev + 1, totalSections - 1));
  };

  const prevSection = () => {
    setSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  const skipToSection = (index) => {
    if (index < 0 || index >= totalSections) return;
    setSectionIndex(index);
  };

  const handleWheel = (event) => {
    if (isScrollingRef.current) return;

    if (event.deltaY > 0) {
      nextSection();
    } else if (event.deltaY < 0) {
      prevSection();
    }

    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, MAIN_SCROLL_DURATION);
  };

  const contextValue = {
    skipToSection,
    nextSection,
    prevSection,
    currentSectionIndex: sectionIndex,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      <div
        className={`${hideOverflow && "overflow-hidden"} ${className}`}
        onWheel={handleWheel}
      >
        {children(sectionIndex)}
      </div>
    </ScrollContext.Provider>
  );
};
