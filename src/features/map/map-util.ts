import { useEffect, useState } from "react";

/**
 *  Check if country is selected on map
 * @param countryID  Country ID
 * @param countryParam  Country param
 * @returns True if country is selected
 */
const isSelected = (countryID: string, countryParam?: string) => {
  const slug = slugify(countryID);
  return slug === countryParam;
};

/**
 *  Slugify country ID
 * @param countryID  Country ID
 * @returns  Slugified country ID
 */
const slugify = (countryID: string) => {
  return countryID.toLowerCase().replace(/ /g, "-");
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * Get window dimensions
 * @returns Window dimensions
 */
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export { isSelected, slugify, useWindowDimensions };
