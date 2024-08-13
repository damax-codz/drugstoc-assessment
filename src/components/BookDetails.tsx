import { Dialog, IconButton } from "@mui/material";
import logo from "./../assets/images/open-book.png";
import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";

interface IBookDetailsProps {
  isOpen: boolean;
  handleClose: () => void;
  bookData: any;
}
const BookDetails = ({ isOpen, handleClose, bookData }: IBookDetailsProps) => {
  console.log(bookData?.volumeInfo?.previewLink);
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{
        ".MuiPaper-root": {
          maxWidth: "90vw",
          paddingTop: "20px",
        },
      }}
    >
      <div>
        <div className="flex justify-end w-full pr-2 lg:pr-8">
          <IconButton onClick={() => handleClose()}>
            <SmallCloseIcon />
          </IconButton>
        </div>
        <div className="my-0 lg:my-10 mr-0 lg:mr-10 flex justify-end relative">
          {bookData?.volumeInfo?.imageLinks?.thumbnail ? (
            <img
              src={bookData?.volumeInfo?.imageLinks?.thumbnail}
              alt={bookData?.volumeInfo?.title}
              className="h-[60%] absolute left-[12%] xl:left-[16%] top-[15%] hidden lg:block"
            />
          ) : (
            <img
              src={logo}
              alt={bookData?.volumeInfo?.title}
              className="h-[60%] absolute left-[12%] lg:left-[16%] top-[15%] hidden lg:block"
            />
          )}
          <div className="bg-white lg:bg-[#F2F2F2] py-10 lg:py-20 w-full lg:w-[75%] ps-3 lg:ps-60 pe-3 lg:pe-10">
            {bookData?.volumeInfo?.imageLinks?.thumbnail ? (
              <img
                src={bookData?.volumeInfo?.imageLinks?.thumbnail}
                alt={bookData?.volumeInfo?.title}
                className=" block lg:hidden mb-6"
              />
            ) : (
              <img
                src={logo}
                alt={bookData?.volumeInfo?.title}
                className=" opacity-70 block lg:hidden mb-6"
              />
            )}
            <p className="text-[#33333399] font-semibold">
              {bookData?.volumeInfo?.authors?.length > 2
                ? `${bookData?.volumeInfo?.authors
                    ?.slice(0, 2)
                    .join(", ")} and ${
                    bookData.volumeInfo.authors.length - 2
                  } other(s)`
                : bookData?.volumeInfo?.authors?.join(", ")}
            </p>
            <p className="font-degular text-[30px] max-w-[350px] leading-9 my-6">
              {bookData?.volumeInfo?.title}
            </p>
            <p className="text-[#33333399] font-semibold">
              {bookData?.volumeInfo?.description?.slice(0, 700) + "..."}
            </p>
            <button
              onClick={() =>
                window.open(bookData?.volumeInfo?.infoLink, "_blank")
              }
              className="mt-6 text-white bg-red-400 px-8 py-2 rounded-[4px] font-semibold"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookDetails;
