export const calcMargin = (title, base = 16, charWidth = 10, padding = 8) => {
  const extraChars = title.length - base;
  return `${extraChars > 0 ? "-" : ""}${Math.abs(extraChars * charWidth + padding)}px`;
};
