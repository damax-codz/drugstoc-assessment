import { SearchIcon } from "@chakra-ui/icons";

interface ISearchInputProps {
  search: string;
  setSearch: (value: string) => void;
}
const SearchInput = ({ search, setSearch }: ISearchInputProps) => {
  return (
    <div className="relative w-full md:w-auto">
      <SearchIcon className="absolute top-[18px] left-[14px]" />
      <input
        type="text"
        placeholder="search for book name, author name"
        className="search_input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
