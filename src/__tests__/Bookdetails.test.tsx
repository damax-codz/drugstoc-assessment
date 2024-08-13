import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BookDetails from "../components/BookDetails";
import logo from "./../assets/images/open-book.png";

const mockBookData = {
  volumeInfo: {
    title: "Sample Book",
    authors: ["Author One", "Author Two", "Author Three"],
    description: "This is a sample description of the book.",
    imageLinks: {
      thumbnail: "https://example.com/sample-thumbnail.jpg",
    },
    infoLink: "https://example.com/sample-book",
  },
};

test("renders the modal when isOpen is true", () => {
  render(
    <BookDetails
      isOpen={true}
      handleClose={jest.fn()}
      bookData={mockBookData}
    />
  );
  const modalContent = screen.getByText(/Sample Book/i);
  expect(modalContent).toBeInTheDocument();
});

test("does not render the modal when isOpen is false", () => {
  render(
    <BookDetails
      isOpen={false}
      handleClose={jest.fn()}
      bookData={mockBookData}
    />
  );
  const modalContent = screen.queryByText(/Sample Book/i);
  expect(modalContent).not.toBeInTheDocument();
});

test("calls handleClose when the close button is clicked", () => {
  const handleClose = jest.fn();
  render(
    <BookDetails
      isOpen={true}
      handleClose={handleClose}
      bookData={mockBookData}
    />
  );

  const closeButton = screen.getByRole("button", { name: /close/i });
  fireEvent.click(closeButton);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("renders thumbnail image when available", () => {
  render(
    <BookDetails
      isOpen={true}
      handleClose={jest.fn()}
      bookData={mockBookData}
    />
  );
  const thumbnailImage = screen.getAllByAltText(/Sample Book/i);
  thumbnailImage.forEach((image) => {
    expect(image).toHaveAttribute(
      "src",
      mockBookData.volumeInfo.imageLinks.thumbnail
    );
  });
});

test("renders default logo images for both desktop and mobile when thumbnail is not available", () => {
  const bookDataWithoutThumbnail = {
    ...mockBookData,
    volumeInfo: {
      ...mockBookData.volumeInfo,
      imageLinks: null,
    },
  };

  render(
    <BookDetails
      isOpen={true}
      handleClose={jest.fn()}
      bookData={bookDataWithoutThumbnail}
    />
  );

  const images = screen.getAllByAltText(/Sample Book/i);

  images.forEach((image) => {
    expect(image).toHaveAttribute("src", logo);
  });
});

test('opens the infoLink when "Read more" button is clicked', () => {
  render(
    <BookDetails
      isOpen={true}
      handleClose={jest.fn()}
      bookData={mockBookData}
    />
  );

  const readMoreButton = screen.getByText(/Read more/i);
  window.open = jest.fn(); 

  fireEvent.click(readMoreButton);
  expect(window.open).toHaveBeenCalledWith(
    mockBookData.volumeInfo.infoLink,
    "_blank"
  );
});
