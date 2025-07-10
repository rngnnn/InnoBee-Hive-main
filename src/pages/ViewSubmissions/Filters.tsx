import useFiltersState from "./usePageState/useFiltersState";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  filtersState: ReturnType<typeof useFiltersState>;
};

export default function Filters({ filtersState }: Props) {
  const { stage, currentStage, toggleStage, toggleSort, listSort, sortBy } =
    filtersState;

  return (
    <div className="w-full ">
      <form className="max-w-96 w-full bg-white shadow-md rounded-full flex-1 flex-row flex-center-between px-3 h-10 text-gray-400 max-lg:hidden ">
        <input
          type="search"
          placeholder="Search by title or keyword"
          className="flex-1 outline-none border-none text-sm"
        />
        <button type="submit" className="bg-white text-gray-400 p-0 m-0">
          <IoSearchOutline />
        </button>
      </form>
      <div className="w-full py-6">
        <h6 className="text-gray-500 font-medium pb-1">Stage</h6>
        <div className="w-full flex-center gap-3 flex-wrap py">
          {stage?.map((stage, index) => (
            <p
              key={index}
              onClick={() => toggleStage(stage)}
              className={`px-4 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all bg-white text-gray-500 ${
                currentStage === stage && "border-1 border-brown"
              }`}
            >
              {stage}
            </p>
          ))}
        </div>
        <h6 className="text-gray-500 font-medium pb-1 pt-4">Order by</h6>
        <div className="w-full flex-center gap-3 flex-wrap py">
          {listSort?.map((sortItem, index) => (
            <p
              key={index}
              onClick={() => toggleSort(sortItem)}
              className={`px-4 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all bg-white text-gray-500 ${
                sortBy === sortItem && "border-1 border-brown"
              }`}
            >
              {sortItem}
            </p>
          ))}
        </div>
      </div>
      <p
        className={`px-6 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all text-white bg-brown w-fit`}
      >
        Apply filter
      </p>
    </div>
  );
}
