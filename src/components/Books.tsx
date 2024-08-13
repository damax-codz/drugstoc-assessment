import { useState } from "react";
import BookDetails from "./BookDetails";
import { Tooltip } from "@chakra-ui/react";
import logo from "./../assets/images/open-book.png";
import Pagination from "@mui/material/Pagination";

const Books = ({ data }: { data: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedData = data?.slice(startIndex, endIndex);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[70px] gap-6 gap-y-8">
        {paginatedData?.map((book: any) => (
          <div
            key={book.id}
            className="book_card flex flex-col gap-3 cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setBookData(book);
            }}
          >
            <div className="bg-[#F2F2F2] h-[250px] md:h-[350px]  w-full flex items-center justify-center rounded-[16px]">
              {book?.volumeInfo?.imageLinks?.thumbnail ? (
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt={book?.volumeInfo?.title}
                  className="h-3/4"
                />
              ) : (
                <img
                  src={logo}
                  alt={book?.volumeInfo?.title}
                  className="h-3/4 opacity-70"
                />
              )}
            </div>
            <div className="flex flex-col items-start">
              <div>
                <Tooltip label={book?.volumeInfo?.title}>
                  <p
                    className="book_card_title"
                    style={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book?.volumeInfo?.title}
                  </p>
                </Tooltip>
                <p className="book_card_author">
                  {book?.volumeInfo?.authors?.length > 2
                    ? `${book.volumeInfo.authors.slice(0, 2).join(", ")} and ${
                        book.volumeInfo.authors.length - 2
                      } other(s)`
                    : book?.volumeInfo?.authors?.join(", ")}
                </p>
              </div>
              <p className="book_card_published_date">
                {book?.volumeInfo?.publishedDate
                  ? new Date(book?.volumeInfo?.publishedDate).toDateString()
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8 w-full flex justify-end">
        <Pagination
          count={data?.length / 10}
          page={page}
          onChange={handleChange}
        />
      </div>
      <BookDetails
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
        bookData={bookData}
      />
    </>
  );
};

export default Books;
