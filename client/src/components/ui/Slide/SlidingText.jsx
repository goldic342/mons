import { motion } from "framer-motion";
import { BASE_DURATION, LINE_DELAY, WORD_DELAY } from "../uiConfig";

const SlidingText = ({
  text,
  lineDelay = LINE_DELAY,
  wordDelay = WORD_DELAY,
  className = "",
}) => {
  const lines = text.split("\n");

  return (
    <div className={`overflow-hidden text-white ${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap">
          {line
            .trim()
            .split(/\s+/)
            .map((word, wordIndex) => {
              const currWordDelay =
                lineIndex * lineDelay + wordIndex * wordDelay;

              return (
                <motion.span
                  key={wordIndex}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  transition={{
                    duration: BASE_DURATION,
                    delay: currWordDelay,
                  }}
                  className="mr-2"
                >
                  {word}
                </motion.span>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default SlidingText;
