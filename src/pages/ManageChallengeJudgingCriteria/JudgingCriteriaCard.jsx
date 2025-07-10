import { PiDotsSixBold } from "react-icons/pi";
import { useJudgingCriteriaData } from "./JudgingCriteriaContext";
import WeightManager from "./WeightManager";
import { FiTrash2 } from "react-icons/fi";

const JudgingCriteriaCard = ({ item }) => {
  const { setCriteriaData } = useJudgingCriteriaData();
  const handleDeleteEvent = () => {
    setCriteriaData((prev) => prev.filter((i) => i.uuid !== item.uuid));
  };

  return (
    <div className="flex sm:flex-row flex-col w-full gap-4">
      <div className="flex flex-col gap-4 bg-white rounded-lg relative p-4 sm:p-6 w-full">
        <div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
        <PiDotsSixBold className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl cursor-pointer top-2 sm:top-3" />
        <h6 className="font-bold text-lg mt-6 sm:mt-2">{item?.name}</h6>
        <div className="flex sm:flex-row flex-col gap-4">
          <div className="flex flex-col gap-2 sm:w-1/2 w-full">
            <label className="text-sm font-bold" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
              placeholder="Title"
              id="title"
              onChange={(e) => {
                setCriteriaData((prev) =>
                  prev.map((i) =>
                    i.uuid === item.uuid
                      ? { ...i, name: e.target.value, title: e.target.value }
                      : i
                  )
                );
              }}
            />
            <label className="text-sm font-bold" htmlFor="max-score">
              Max score <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
              placeholder="Max score"
              id="max-score"
              type="number"
              onInput={(e) => {
                const value = Math.max(
                  0,
                  Math.min(100, Number(e.target.value))
                );
                e.target.value = value;
              }}
            />
          </div>
          <div className="flex flex-col gap-2 sm:w-1/2 w-full">
            <label className="text-sm font-bold" htmlFor="title">
              Description
            </label>
            <input
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
              placeholder="A short description of the criterion"
            ></input>
            <div>
              <label className="text-sm font-bold" htmlFor="weight">
                Weight <span className="text-red-500">*</span>
              </label>
              <WeightManager criterion={item} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer sm:w-auto flex items-center justify-center"
        onClick={handleDeleteEvent}
      >
        <FiTrash2 />
      </div>
    </div>
  );
};

export default JudgingCriteriaCard;