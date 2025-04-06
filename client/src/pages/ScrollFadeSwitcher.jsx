import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { title: "Section 1", content: "Content of section 1" },
  { title: "Section 2", content: "Content of section 2" },
  { title: "Section 3", content: "Content of section 3" },
  { title: "Section 4", content: "Content of section 4" },
];

export default function SectionScrollSimplified() {
  const [index, setIndex] = useState(0);

  const handleScroll = (e) => {
    if (index < sections.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      onWheel={handleScroll}
      className="min-h-screen flex flex-col items-center justify-start py-24 gap-16 overflow-hidden"
    >
      <AnimatePresence>
        {sections.map((sec, idx) => {
          const isPast = idx < index;
          const isCurrent = idx === index;

          return (
            <motion.div
              key={idx}
              layout="position"
              animate={{ opacity: isPast ? 0 : 1, y: isPast ? -40 : 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className={`w-2/3 text-center text-2xl font-bold`}
            >
              <div>{sec.title}</div>
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base mt-4 font-normal"
                >
                  {sec.content}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
