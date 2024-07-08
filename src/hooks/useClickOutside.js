import { useEffect, useRef } from "react";

export const useClickOutside = (handler, captureClick = false) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick, captureClick);

    return () => {
      document.removeEventListener("click", handleClick, captureClick);
    };
  }, [handler, captureClick]);

  return { ref };
};
