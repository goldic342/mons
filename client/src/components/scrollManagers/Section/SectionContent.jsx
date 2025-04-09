import { AnimatePresence } from "framer-motion";
import SlideReveal from "../../ui/Slide/SlidingReveal";
import { useScroll } from "../../../contexts/ScrollContext";
import { BASE_DURATION } from "../../ui/uiConfig";

const SectionContent = ({ idx, content }) => {
  const { currentSectionIndex: sectionIndex } = useScroll();
  const isActive = idx === sectionIndex;

  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <SlideReveal
          className="text-second text-sm indent-11 max-w-81"
          key={`content-${idx}`}
          delay={idx === 0 ? BASE_DURATION * 2 : 0}
        >
          {content}
        </SlideReveal>
      )}
    </AnimatePresence>
  );
};

export default SectionContent;
