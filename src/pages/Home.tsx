import { useEffect, useState } from "react";
import "./home.scss";
import SearchInput from "../components/inputs/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "@chakra-ui/icons";
import Books from "../components/Books";
import logo from "./../assets/images/open-book.png";
import toast from "react-hot-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [search, setSearch] = useState("");

  //query to fetch bookes
  const { data, error, isLoading } = useQuery({
    queryKey: ["books", search],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`
      );
      return response?.data;
    },
    enabled: !!search,
  });

  // function to check for api request errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <div className="wrapper">
      <div className="header">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="logo w-10 h-10" />
            <p className="header_text">Book</p>
          </div>
          <p className="header_sub-text text-[10px]">
            Find books at your comfort
          </p>
        </div>
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div className="page_body">
        {search === "" && (
          <div className="no_record">
            <div className="no_record_body">
              <span className="no_record_icon">
                <SearchIcon className="" />
              </span>
              <p className="no_record_title">
                Please search for a book to proceed
              </p>
              <p className="no_record_description">
                Enter a search term to find books - for example, "Harry Potter"
                or "Author Name"
              </p>
            </div>
          </div>
        )}
        {search !== "" && data?.totalItems === 0 && (
          <div className="no_record">
            <div className="no_record_body">
              <span className="no_record_icon">
                <SearchIcon className="" />
              </span>
              <p className="no_record_title">No book found</p>
              <p className="no_record_description">
                Oops, seems we can't find the book you're looking for,please
                enter a different search term{" "}
              </p>
            </div>
          </div>
        )}
        {search !== "" && isLoading && (
          <div className="mt-[30vh] flex justify-center w-full">
            <CircularProgress
              sx={{
                color: "#000000",
                width: "24px !important",
                height: "24px !important",
              }}
            />
          </div>
        )}
        {search !== "" && data?.totalItems > 0 && <Books data={data?.items} />}
      </div>
    </div>
  );
};

export default Home;
