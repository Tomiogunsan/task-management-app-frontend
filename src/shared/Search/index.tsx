import { IoIosSearch } from "react-icons/io";

import { twMerge } from "tailwind-merge";
import { ISearchProps } from "./interface";

const Search = ({ placeholderText, className }: ISearchProps) => {
  return (
    <div
      className={twMerge(
        "flex items-center  gap-4 bg-white p-2 rounded-[16px] ",
        className
      )}
    >
      <button className="cursor-pointer text-[#aaa6a6]">
        <IoIosSearch />
      </button>
      <input
        type="text"
        placeholder={placeholderText}
        className="bg-transparent outline-none"
      />
    </div>
  );
};

export default Search;
