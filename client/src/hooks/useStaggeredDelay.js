import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStagger } from "../contexts/StaggerContext";

export const useStaggeredDelay = ({ inView, duration }) => {
  const { addDelay } = useStagger();

  const reservedDelay = useRef(null);
  const [localDelay, setLocalDelay] = useState(null);

  useLayoutEffect(() => {
    reservedDelay.current = addDelay(duration);
  }, [addDelay, duration]);

  useEffect(() => {
    if (inView && reservedDelay.current !== null && localDelay === null) {
      setLocalDelay(reservedDelay.current);
    }
  }, [inView, localDelay]);

  return localDelay;
};
