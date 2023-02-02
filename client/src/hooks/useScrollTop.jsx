import { useEffect } from "react";

const useScrollTop = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, []);
  return;
};

export default useScrollTop;
