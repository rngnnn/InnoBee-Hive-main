// import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
// import { IoMdReorder } from "react-icons/io";

// interface Faq {
//   id: number;
//   question: string;
//   answer: string;
// }

// interface FaqCardProps { 
//   faq: Faq;
//   index: number;
//   updateFaq: (id: number, field: "question" | "answer", value: string) => void;
//   deleteFaq: (id: number) => void;
// }

// const FaqCard: React.FC<FaqCardProps> = ({ faq, index, updateFaq, deleteFaq }) => {
//   return (
//     <div className="relative flex flex-col gap-4 bg-white rounded-lg p-6 w-full shadow-md border border-gray-200 transition hover:shadow-lg">
//       <div className="absolute top-0 left-0 h-full w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
//       <IoMdReorder className="absolute left-1/2 transform -translate-x-1/2 text-2xl cursor-pointer text-gray-400" />
//       <h6 className="font-bold text-lg mt-2">FAQ {index + 1}</h6>

//       <div className="flex flex-col gap-4">
//             <label className="text-sm font-bold" htmlFor="title">
//               Question <span className="text-red-500">*</span>
//             </label>
//         <input
//           type="text"
//           placeholder="What is an FAQ?"
//           // value={faq.question}
//           onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
//           className="bg-gray-100 w-full px-4 py-3 rounded-xl outline-none focus:border-pri-color border border-gray-300 shadow-sm"
//         />

//             <label className="text-sm font-bold" htmlFor="title">
//               Answer <span className="text-red-500">*</span>
//             </label>
//         <textarea
//           // value={faq.answer}
//           placeholder="Chances are someone else might have the same question as you. Look here for answers and ideas."
//           onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
//           className="bg-gray-100 p-4 w-full rounded-xl resize-none outline-none focus:border-pri-color border border-gray-300 shadow-sm"
//           rows={3}
//         />
//       </div>

//       <div className="absolute top-4 right-4 flex gap-2 text-xl">
//         <button className="text-gray-600 hover:text-gray-800">
//           <FaRegEdit />
//         </button>
//         <button className="text-gray-600 hover:text-red-500" onClick={() => deleteFaq(faq.id)}>
//           <FiTrash2 />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FaqCard;

import { PiDotsSixBold } from 'react-icons/pi';
import { FiTrash2 } from "react-icons/fi";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface FaqCardProps {
  faq: Faq;
  index: number;
  updateFaq: (id: number, field: "question" | "answer", value: string) => void;
  deleteFaq: (id: number) => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ faq, index, updateFaq, deleteFaq }) => {
  return (
    <div className="flex sm:flex-row flex-col w-full gap-4">
      {/* Main Card */}
      <div className="flex flex-col gap-4 bg-white rounded-lg relative p-4 sm:p-6 w-full">
        {/* Left Accent Bar */}
        <div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />

        {/* Drag Handle */}
        <PiDotsSixBold className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl cursor-pointer top-2 sm:top-3" />

        {/* FAQ Title */}
        <h6 className="font-bold text-lg mt-6 sm:mt-2">FAQ {index + 1}</h6>

        {/* Inputs - Stacked Vertically */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor="question">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="What is an FAQ?"
              value={faq.question}
              onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border border-gray-300 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor="answer">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Chances are someone else might have the same question as you. Look here for answers and ideas."
              value={faq.answer}
              onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
              className="bg-gray-100 p-3 sm:p-4 w-full rounded-xl resize-none outline-none focus:border-pri-color border border-gray-300 rows-3 text-sm sm:text-base"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div
        className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer sm:w-auto flex items-center justify-center"
        onClick={() => deleteFaq(faq.id)}
      >
        <FiTrash2 />
      </div>
    </div>
  );
};

export default FaqCard;
