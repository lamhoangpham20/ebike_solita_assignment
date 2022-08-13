import { render, screen } from "@testing-library/react";
import StationElements from "../components/StationElements";

test("on inital render Loading is load", () => {
  render(<StationElements stations={[{ id: "001", name: "test," }]} />);
  expect(screen.getByRole("row", { name: /simple row/i })).toBeEnabled();
});
