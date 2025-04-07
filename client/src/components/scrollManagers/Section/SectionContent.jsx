import { AnimatePresence } from "framer-motion";
import SlideReveal from "../../ui/Slide/SlidingReveal";
import { useScroll } from "../../../contexts/ScrollContext";

const SectionContent = ({ idx, content }) => {
  const { currentSectionIndex: sectionIndex } = useScroll();
  const isActive = idx === sectionIndex;

  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <SlideReveal
          className="text-second text-sm indent-11 max-w-81"
          key={`content-${idx}`}
        >
          {content}
        </SlideReveal>
      )}
    </AnimatePresence>
  );
};

export default SectionContent;
