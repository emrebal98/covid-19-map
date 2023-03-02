import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { isSelected, slugify, useWindowDimensions } from "./map-util";
import type { MouseLocation, Tooltip } from "./map-type";
import geoJSON from "../../geo.json";
import clsx from "clsx";

export default function Map() {
  const navigate = useNavigate();
  const { country: countryParam } = useParams();

  const [tooltip, setTooltip] = useState<Tooltip>({ text: "", show: false });
  const [mouse, setMouse] = useState<MouseLocation>({ x: 0, y: 0 });
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSelect = (countryID: string) => {
    const slug = slugify(countryID);
    navigate(`/${slug}`);
  };

  const handleUnSelect = () => {
    navigate("/");
  };

  //Events to control tooltip
  const handleMouseEnter = (countryName: string) => {
    setTooltip({ text: countryName, show: true });
  };

  const handleMouseLeave = () => {
    setTooltip({ text: "", show: false });
  };

  const handleStartDrag = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <>
      {/* Tooltip */}
      {tooltip.show && (
        <p
          className="absolute rounded bg-red-500 px-2 py-1 text-white dark:bg-red-700"
          style={{ top: mouse.y + 20, left: mouse.x + 20 }}
          data-testid="tooltip"
        >
          {tooltip.text}
        </p>
      )}
      <ComposableMap
        className="bg-slate-300 dark:bg-slate-800"
        width={width}
        height={height}
        projectionConfig={{ scale: 160 }}
      >
        <ZoomableGroup
          onMoveStart={handleStartDrag}
          translateExtent={[
            [0 - width / 2, 0 - height / 2],
            [width * 1.6, height * 1.5],
          ]}
        >
          <rect
            width={width}
            height={height}
            fill="transparent"
            onClick={handleUnSelect}
          />
          <Geographies geography={geoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  className={clsx(
                    "stroke-slate-300 focus:outline-none dark:stroke-slate-400",
                    {
                      "fill-red-500 hover:fill-red-600 dark:fill-red-700 dark:hover:fill-red-800":
                        isSelected(geo.id, countryParam),
                      "fill-slate-50 hover:fill-red-400 dark:fill-slate-600 dark:hover:fill-red-600":
                        !isSelected(geo.id, countryParam),
                    }
                  )}
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleSelect(geo.id)}
                  onMouseEnter={() => handleMouseEnter(geo.properties.name)}
                  onMouseLeave={handleMouseLeave}
                  data-testid="country-geo"
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}
