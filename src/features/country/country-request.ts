import axios from "axios";
import type { ICountryResponse } from "./country-type";

export function requestCountry(country: string) {
  return axios.request<ICountryResponse>({
    method: "GET",
    url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
    params: { country },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    },
  });
}
