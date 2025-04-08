import { SECTION_SCROLL_DURATION } from "../../constants";
import LogoBlack from "../../assets/mons-black.svg";
import Logo from "../../assets/mons.svg";

export const baseSectionClass =
  "w-full h-full flex flex-col justify-center items-center";

export const BASE_DURATION = 0.5;
export const WORD_DELAY = 0.1;
export const LINE_DELAY = 0.3;

export const HEADER_COLORS_MAP = {
  0: { color: "white", logo: Logo }, // Hero
  1: { color: "white", logo: Logo }, // Support text
  2: { color: "black", logo: LogoBlack }, // Abilities
};

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
