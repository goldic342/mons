import { LINE_DELAY, WORD_DELAY } from "../components/ui/uiConfig";

export const calcTextDelay = (
  text,
  lineDelay = LINE_DELAY,
  wordDelay = WORD_DELAY,
) => {
  const lines = text.split("\n");
  const totalWords = lines.reduce(
    (acc, line) => acc + line.trim().split(/\s+/).length,
    0,
  );

  return lines.length * lineDelay + (totalWords - lines.length) * wordDelay;
};
