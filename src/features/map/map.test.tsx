import { describe } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProvider } from "../../utils/test-utils";
import Map from "./map";

describe("features/map", () => {
  it("should render all countries", () => {
    renderWithProvider(<Map />);
    const country = screen.getAllByTestId(/country-geo/i);
    expect(country.length).toEqual(202);
  });

  it("should render tooltip on hover", () => {
    renderWithProvider(<Map />);

    const country = screen.getAllByTestId(/country-geo/i);
    fireEvent.mouseEnter(country[0]);
    expect(screen.queryByTestId(/tooltip/i)).toBeInTheDocument();

    fireEvent.mouseLeave(country[0]);
    expect(screen.queryByTestId(/tooltip/i)).not.toBeInTheDocument();
  });
});
