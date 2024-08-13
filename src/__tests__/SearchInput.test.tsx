import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchInput from "../components/inputs/SearchInput";

test("renders the input field with the correct initial value", () => {
  const setSearchMock = jest.fn();
  render(<SearchInput search="initial value" setSearch={setSearchMock} />);

  const inputElement = screen.getByPlaceholderText(
    /search for book name, author name/i
  );
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue("initial value");
});

test("calls setSearch function when input value changes", () => {
  const setSearchMock = jest.fn();
  render(<SearchInput search="" setSearch={setSearchMock} />);

  const inputElement = screen.getByPlaceholderText(
    /search for book name, author name/i
  );
  fireEvent.change(inputElement, { target: { value: "new search" } });

  expect(setSearchMock).toHaveBeenCalledTimes(1);
  expect(setSearchMock).toHaveBeenCalledWith("new search");
});
