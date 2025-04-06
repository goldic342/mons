import React from "react";
import { ScrollProvider } from "../../contexts/ScrollContext";
import SingleSection from "./SingleSection";

export default function SectionScroll({
  sections = [],
  className = "",
  itemClassName = "",
}) {
  return (
    <ScrollProvider className={className} hideOverflow={false} preventDefault>
      {(sectionIndex, scrollerId) => (
        <>
          {sections.map((sec, idx) => (
            <SingleSection
              idx={idx}
              key={idx}
              sec={sec}
              scrollerId={scrollerId}
              sectionIndex={sectionIndex}
              className={itemClassName}
            />
          ))}
        </>
      )}
    </ScrollProvider>
  );
}
