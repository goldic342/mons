import { motion, AnimatePresence } from "framer-motion";
import { titleVariants, contentVariants } from "../ui/uiConfig";
import { useScroll } from "../../contexts/ScrollContext";

const SingleSection = ({ sec, idx, className, scrollerId }) => {
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
        <motion.section
          id={`section-${scrollerId}-${idx}`}
          key={`section-${idx}`}
          className={`w-full flex ${className}`}
        >
          <motion.div
            layout={isAbove ? false : "position"}
            className={`text-xl text-center uppercase font-serif ${blurClass} ${isActive ? "mb-60" : ""}`}
            variants={titleVariants}
            initial="inactive"
            animate={variant}
            exit="previous"
          >
            {sec.title}
          </motion.div>
          {isActive && (
            <motion.div
              key={`content-${idx}`}
              variants={contentVariants}
              initial="inactive"
              animate="active"
              exit="inactive"
              className="text-second text-sm indent-11 max-w-81"
            >
              {sec.content}
            </motion.div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default SingleSection;
