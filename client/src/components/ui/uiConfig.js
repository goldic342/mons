import { SECTION_SCROLL_DURATION } from "../../constants";

export const baseSectionClass =
  "w-full h-full flex flex-col justify-center items-center";

export const BASE_DURATION = 0.5;
export const WORD_DELAY = 0.1;
export const LINE_DELAY = 0.3;

// === SectionScroll ===

export const titleVariants = {
  previous: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.5 },
  },
  active: {
    opacity: 1,
    transition: { duration: SECTION_SCROLL_DURATION / 1000 },
    y: 0,
  },
  upcoming: {
    opacity: 0.5,
    transition: { duration: 1 },
  },
  inactive: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

export const contentVariants = {
  active: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeIn" },
  },
  inactive: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
