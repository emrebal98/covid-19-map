import { describe, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../utils/test-utils";
import Country from "./country";
import type { ICountry } from "./country-type";

describe("features/country", () => {
  it("should render on successful state", () => {
    const testCountry: ICountry = {
      location: "test location",
      confirmed: 1,
      deaths: 1,
      recovered: 1,
      lastChecked: "2021-05-01T00:00:00Z",
      lastReported: "2021-05-01T00:00:00Z",
    };

    renderWithProvider(
      <Country country={testCountry} loadingState={"READY"} />
    );
    const h1 = screen.getByTestId(/country-title/i);
    expect(h1.innerHTML).not.toBeNull();

    const confirmed = screen.getByTestId(/confirmed cases/i);
    expect(confirmed.innerHTML).toEqual("1");

    const deaths = screen.getByTestId(/deaths/i);
    expect(deaths.innerHTML).toEqual("1");

    const recovered = screen.getByTestId(/recovered/i);
    expect(recovered.innerHTML).toEqual("1");

    const lastChecked = screen.getByTestId(/last checked/i);
    expect(lastChecked.innerHTML).not.toBeNull();

    const lastReported = screen.getByTestId(/last reported/i);
    expect(lastReported.innerHTML).not.toBeNull();
  });

  it("should render on loading state", () => {
    renderWithProvider(<Country loadingState={"LOADING"} />);
    const h1 = screen.getByTestId(/country-title/i);
    expect(h1.innerHTML).toEqual("Loading");

    const confirmed = screen.getByTestId(/confirmed cases/i);
    expect(confirmed.innerHTML).toEqual("Loading");

    const deaths = screen.getByTestId(/deaths/i);
    expect(deaths.innerHTML).toEqual("Loading");

    const recovered = screen.getByTestId(/recovered/i);
    expect(recovered.innerHTML).toEqual("Loading");

    const lastChecked = screen.getByTestId(/last checked/i);
    expect(lastChecked.innerHTML).toEqual("Loading");

    const lastReported = screen.getByTestId(/last reported/i);
    expect(lastReported.innerHTML).toEqual("Loading");
  });

  it("should render on error state", () => {
    renderWithProvider(
      <Country loadingState={"ERROR"} errorTitle={"Error Title"} />
    );

    const h1 = screen.getByTestId(/country-title/i);
    expect(h1.innerHTML).toEqual("Error Title");

    const confirmed = screen.getByTestId(/confirmed cases/i);
    expect(confirmed.innerHTML).toEqual("Error");

    const deaths = screen.getByTestId(/deaths/i);
    expect(deaths.innerHTML).toEqual("Error");

    const recovered = screen.getByTestId(/recovered/i);
    expect(recovered.innerHTML).toEqual("Error");

    const lastChecked = screen.getByTestId(/last checked/i);
    expect(lastChecked.innerHTML).toEqual("Error");

    const lastReported = screen.getByTestId(/last reported/i);
    expect(lastReported.innerHTML).toEqual("Error");
  });
});
