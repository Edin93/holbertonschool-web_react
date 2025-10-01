import { render } from "@testing-library/react";
import { test } from "@jest/globals";
import App from "./App";

test("Should render the header, login, and footer components", () => {
  render(<App />);
});
