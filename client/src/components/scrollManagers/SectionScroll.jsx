import React from "react";
import { ScrollProvider } from "../../contexts/ScrollContext";
import SectionTitle from "./Section/SectionTitle";
import SectionContent from "./Section/SectionContent";

export default function SectionScroll({ sections = [], className = "" }) {
  return (
    <ScrollProvider className={className} hideOverflow={false} preventDefault>
      {(sectionIndex, scrollerId) => (
        <div className="flex space-x-48">
          <div>
            {sections.map((sec, idx) => (
              <SectionTitle
                title={sec.title}
                key={`t-${idx}`}
                idx={idx}
                scrollerId={scrollerId}
              />
            ))}
          </div>
          <div className="pr-37">
            {sections.map((sec, idx) => (
              <SectionContent
                content={sec.content}
                idx={idx}
                key={`c-${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </ScrollProvider>
  );
}
