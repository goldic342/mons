import { ScrollProvider } from "../contexts/ScrollContext";
import React from "react";
import { MAIN_SCROLL_DURATION } from "../constants";

const FullPageScroll = ({ children }) => {
  return (
    <ScrollProvider className="w-full h-screen">
      {(sectionIndex, scrollerId) => (
        <div
          className={`transition-transform duration-${MAIN_SCROLL_DURATION}`}
          style={{ transform: `translateY(-${sectionIndex * 100}vh)` }}
        >
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className={"w-full h-screen"}
              id={`section-${scrollerId}-${idx}`}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </ScrollProvider>
  );
};

export default FullPageScroll;
