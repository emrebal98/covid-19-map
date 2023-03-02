import { describe, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../utils/test-utils";
import Error from "./error";

describe("features/error", () => {
  it("should render error page correctly", async () => {
    renderWithProvider(<Error />);
    const h1 = screen.getByText(/404/i);
    expect(h1).toBeInTheDocument();
  });
});
