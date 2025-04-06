import { ScrollProvider } from "../../contexts/ScrollContext";
import React from "react";
import { MAIN_SCROLL_DURATION } from "../../constants";

const FullPageScroll = ({ children }) => {
  return (
    <ScrollProvider className="w-full h-screen">
      {(sectionIndex, scrollerId) => (
        <div
          className={"transition-transform"}
          style={{
            transform: `translateY(-${sectionIndex * 100}vh)`,
            transitionDuration: `${MAIN_SCROLL_DURATION}ms`,
          }}
        >
          {React.Children.map(children, (child, idx) => (
            <section
              key={idx}
              className={"w-full h-screen"}
              id={`section-${scrollerId}-${idx}`}
            >
              {child}
            </section>
          ))}
        </div>
      )}
    </ScrollProvider>
  );
};

export default FullPageScroll;
