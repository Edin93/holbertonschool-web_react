import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import App from "./App";

test("Should render the header, login, and footer components", () => {
  render(<App />);
});
