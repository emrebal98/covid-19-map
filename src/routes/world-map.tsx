import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import Map from "../features/map/map";
import { ReactComponent as IconSun } from "../assets/sun.svg";
import { ReactComponent as IconMoon } from "../assets/moon.svg";
import { toggleTheme } from "../utils/theme-slice";

export default function WorldMap() {
  const { country: countryParam } = useParams();

  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      {/* Left Drawer */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-full bg-slate-100 shadow-lg transition-[left] duration-300 ease-in-out dark:bg-slate-600 dark:shadow-slate-900 sm:w-1/2 md:w-1/3"
        style={{ left: countryParam ? 0 : "-100%" }}
      >
        <Outlet />
      </div>
      <Map />
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded bg-slate-400 px-2 py-1 dark:bg-slate-900">
        <p className="text-sm text-white">COVID-19 MAP</p>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className="flex items-center justify-center rounded-full bg-slate-400 p-2 hover:bg-slate-500 dark:bg-slate-900 dark:hover:bg-slate-700"
          type="button"
        >
          {theme === "DARK" ? (
            <IconSun
              className="h-6 w-6 text-white"
              onClick={handleThemeChange}
            />
          ) : (
            <IconMoon
              className="h-6 w-6 text-white"
              onClick={handleThemeChange}
            />
          )}
        </button>
      </div>
    </>
  );
}
