import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { titleVariants } from "../../ui/uiConfig";
import { useScroll } from "../../../contexts/ScrollContext";

const SectionTitle = ({ title, idx, scrollerId }) => {
  const { currentSectionIndex: sectionIndex } = useScroll();

  const getTitleVariant = (idx, currentIndex) => {
    if (idx === currentIndex) return "active";
    if (idx < currentIndex) return "previous";
    if (idx >= currentIndex + 1) return "upcoming";
    return "inactive";
  };

  const isActive = idx === sectionIndex;
  const variant = getTitleVariant(idx, sectionIndex);
  const isAbove = idx < sectionIndex;
  const blurClass = variant === "upcoming" ? "blur-[2px]" : "";

  return (
    <AnimatePresence mode="popLayout">
      {!isAbove && (
        <motion.div
          layout={isAbove ? false : "position"}
          id={`section-${scrollerId}-${idx}`}
          className={`text-xl text-center uppercase font-serif ${blurClass} ${isActive ? "mb-60" : ""}`}
          variants={titleVariants}
          initial="inactive"
          animate={variant}
          exit="previous"
        >
          {title}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionTitle;
