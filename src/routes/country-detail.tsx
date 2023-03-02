import { useEffect, useState } from "react";
import {
  type LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import Country from "../features/country/country";
import { getCountry } from "../features/country/country-slice";
import { getCountryName } from "../features/country/country-util";

type LoaderReturnType = { country: string };

export function loader({ params }: LoaderFunctionArgs): LoaderReturnType {
  const { country: countryParam } = params;
  if (!countryParam) throw new Response("Not Found", { status: 404 });

  const countryName = getCountryName(countryParam);
  if (!countryName) throw new Response("Not Found", { status: 404 });

  return { country: countryName };
}

export default function CountryDetail() {
  const { country: countryName } = useLoaderData() as LoaderReturnType;
  const { country: countryParam } = useParams();

  const country = useAppSelector((state) => state.country.data);
  const loadingState = useAppSelector((state) => state.country.state);
  const error = useAppSelector((state) => state.country.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countryName) dispatch(getCountry({ country: countryName }));
  }, [dispatch, countryParam]);

  return (
    <Country country={country} loadingState={loadingState} errorTitle={error} />
  );
}
