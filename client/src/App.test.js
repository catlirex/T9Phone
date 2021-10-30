import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("T9 phone demo input");
  expect(linkElement).toBeInTheDocument();
});
