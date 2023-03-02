import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";

export default function Root() {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <div
      className={clsx("relative overflow-hidden", { dark: theme === "DARK" })}
    >
      <Outlet />
    </div>
  );
}
