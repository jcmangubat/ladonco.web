import { useEffect, useState } from "react";

export const useTogglerVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991.98px)");

    const handleChange = () => setIsVisible(mediaQuery.matches);

    handleChange(); // Initial check
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isVisible;
};