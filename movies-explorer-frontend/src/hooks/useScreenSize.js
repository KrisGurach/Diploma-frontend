import { useState } from "react";
import { useEffect } from "react";
import { screenSizeEnum } from "../utils/enums";

const getScreenSize = () => {
  if (window.innerWidth < 768) {
    return screenSizeEnum.S;
  }

  if (window.innerWidth < 1280) {
    return screenSizeEnum.M;
  }

  return screenSizeEnum.L;
};

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const onResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return screenSize;
}
