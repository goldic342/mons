import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useCallback,
} from "react";
import { MAIN_SCROLL_DURATION } from "../constants";
import { useCtx } from "../hooks/useCtx";
import { useInView } from "framer-motion";

const ScrollContext = createContext({
  skipToSection: () => {},
  nextSection: () => {},
  prevSection: () => {},
  currentSectionIndex: 0,
});

export const useScroll = () => {
  const context = useCtx(ScrollContext, "Scroll");
  return context;
};

export const ScrollProvider = ({
  className = "",
  hideOverflow = true,
  children,
}) => {
  const parentScroll = useCtx(ScrollContext);
  const ref = useRef(null);
  const inView = useInView(ref);

  const [sectionIndex, setSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [scrollerId, setScrollerId] = useState("");

  const isScrollingRef = useRef(false);

  useEffect(() => {
    const id = (Math.random() * 100 + Math.random()).toString(16);
    setScrollerId(id);
  }, []);

  useEffect(() => {
    if (!scrollerId) return;
    setTotalSections(
      document.querySelectorAll(`[id^="section-${scrollerId}-"]`).length,
    );
  }, [children, scrollerId]);

  const nextSection = useCallback(() => {
    setSectionIndex((prev) => Math.min(prev + 1, totalSections - 1));
  }, [totalSections]);

  const prevSection = useCallback(() => {
    setSectionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const skipToSection = (index) => {
    if (index < 0 || index >= totalSections) return;
    setSectionIndex(index);
  };

  const lockScroll = () => {
    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, MAIN_SCROLL_DURATION);
  };

  const isVisible = (el) => {
    if (!el) return false;

    const rect = el.getBoundingClientRect();

    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  };

  const handleWheel = useCallback(
    (event) => {
      if (isScrollingRef.current) return;

      if (!inView) return;

      const childProvider = ref.current.querySelector(
        `[data-scroller-id^="scroller-"]`,
      );
      if (isVisible(childProvider)) return;

      event.preventDefault();
      event.stopPropagation();

      const delta = event.deltaY;
      const scrollingDown = delta > 0;

      const canScrollDown = sectionIndex < totalSections - 1;
      const canScrollUp = sectionIndex > 0;

      if (scrollingDown) {
        if (canScrollDown) {
          nextSection();
          lockScroll();
        } else {
          // at last parent section
          // if there's an even higher parent, it might handle it
          if (parentScroll) {
            parentScroll.nextSection();
          }
        }
      } else {
        if (canScrollUp) {
          prevSection();
          lockScroll();
        } else {
          // at first parent section
          if (parentScroll) {
            parentScroll.prevSection();
          }
        }
      }
    },
    [
      isScrollingRef,
      inView,
      parentScroll,
      sectionIndex,
      totalSections,
      nextSection,
      prevSection,
    ],
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const contextValue = {
    skipToSection,
    nextSection,
    prevSection,
    currentSectionIndex: sectionIndex,
    scrollerId,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={`${hideOverflow ? "overflow-hidden" : ""} ${className}`}
        data-scroller-id={`scroller-${scrollerId}`}
      >
        {typeof children === "function"
          ? children(sectionIndex, scrollerId)
          : children}
      </div>
    </ScrollContext.Provider>
  );
};
