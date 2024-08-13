import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/Home";

test("renders the Home component with search input", () => {
  render(<Home />);
  const searchInput = screen.getByPlaceholderText(
    /search for book name, author name/i
  );
  expect(searchInput).toBeInTheDocument();
});

test("shows a prompt to search for a book when search input is empty", () => {
  render(<Home />);
  const promptTitle = screen.getByText(/please search for a book to proceed/i);
  expect(promptTitle).toBeInTheDocument();
});
