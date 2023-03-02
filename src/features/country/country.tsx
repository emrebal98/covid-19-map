import { Link } from "react-router-dom";
import clsx from "clsx";
import type { ICountry, ILoadingState } from "./country-type";
import { ReactComponent as IconXMark } from "../../assets/x-mark.svg";

interface CountryProps {
  country?: ICountry;
  loadingState: ILoadingState;
  errorTitle?: string;
}

type CovidData = {
  title: string;
  value?: number | Date | null;
};

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const renderValue = (item: CovidData) => {
  if (!item.value) return "Unknown";
  if (typeof item.value === "number") return numberWithCommas(item.value);
  if (item.value instanceof Date)
    return item.value.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
};

export default function Country({
  country,
  loadingState,
  errorTitle,
}: CountryProps) {
  const isLoading = loadingState === "LOADING";
  const isError = loadingState === "ERROR";
  const isReady = !isLoading && !isError;
  const isNoDataOnAPI = country?.location === "Global";

  const covidData: CovidData[] = [
    {
      title: "Confirmed Cases",
      value: country?.confirmed,
    },
    {
      title: "Deaths",
      value: country?.deaths,
    },
    {
      title: "Recovered",
      value: country?.recovered,
    },
    {
      title: "Last Checked",
      value: country ? new Date(country.lastChecked) : undefined,
    },
    {
      title: "Last Reported",
      value: country ? new Date(country.lastReported) : undefined,
    },
  ];

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-between gap-4 px-6 py-3 transition-colors",
          {
            "bg-red-200 dark:bg-red-800": isError,
            "bg-slate-200 dark:bg-slate-700": !isError,
          }
        )}
      >
        <h1
          className={clsx(
            "text-xl font-semibold capitalize transition-colors",
            {
              "text-slate-900 dark:text-slate-50": !isLoading && !isError,
              "w-1/2 animate-pulse rounded bg-slate-400 text-transparent dark:bg-slate-500":
                isLoading,
              "text-red-600 dark:text-red-200": isError,
            }
          )}
          data-testid="country-title"
        >
          {isReady ? country?.location : isError ? errorTitle : "Loading"}
        </h1>
        <Link
          to="/"
          className={clsx(
            "flex items-center justify-center rounded-full p-1 transition-colors",
            {
              "hover:bg-slate-300 dark:hover:bg-slate-600": !isError,
              "hover:bg-red-300 dark:hover:bg-red-700": isError,
            }
          )}
          data-testid="close-button"
        >
          <IconXMark
            className={clsx("h-6 w-6", {
              "text-slate-900 dark:text-slate-50": !isError,
              "text-red-600 dark:text-red-200": isError,
            })}
          />
        </Link>
      </div>
      <div className="py-2">
        {covidData.map((item) => (
          <div
            key={item.title}
            className="flex border-b border-b-slate-300 px-4 py-2 dark:border-b-slate-400"
          >
            <p className="flex-1 rounded pr-2 text-base font-semibold text-slate-900 dark:text-slate-50">
              {item.title}
            </p>

            <p
              className={clsx("flex-1 text-base transition-colors ", {
                "text-slate-900 dark:text-slate-50": !isLoading,
                "animate-pulse rounded bg-slate-300 text-transparent dark:bg-slate-400":
                  isLoading,
              })}
              data-testid={item.title.toLowerCase()}
            >
              {isReady ? renderValue(item) : isError ? "Error" : "Loading"}
            </p>
          </div>
        ))}
      </div>
      {isReady && isNoDataOnAPI && (
        <div className="px-2 py-2 ">
          <p className="rounded bg-amber-300 px-2 py-2 text-sm text-slate-900 dark:bg-amber-700 dark:text-slate-50">
            No data provided on API for this country. Global statistics are
            shown instead.
          </p>
        </div>
      )}
    </>
  );
}
