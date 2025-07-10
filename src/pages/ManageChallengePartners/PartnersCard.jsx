import { PiDotsSixBold } from "react-icons/pi";
import { usePartnersData } from "./PartnersContext";
import { useState } from "react"; // Import useState
import { FiTrash2 } from "react-icons/fi";

const PartnersCard = ({ item }) => {
  const { setPartnersData } = usePartnersData();
  const [logoUrl, setLogoUrl] = useState(item?.logoUrl || null); // State to hold the logo URL

  const handleDeleteEvent = () => {
    setPartnersData((prev) => prev.filter((i) => i.uuid !== item.uuid));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
        setPartnersData((prev) =>
          prev.map((i) =>
            i.uuid === item.uuid ? { ...i, logoUrl: reader.result } : i
          )
        );
      };
      reader.readAsDataURL(file);
    } else {
      setLogoUrl(null); // Clear preview if no file selected
      setPartnersData((prev) =>
        prev.map((i) => (i.uuid === item.uuid ? { ...i, logoUrl: null } : i))
      );
    }
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
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
              placeholder="Title"
              id="title"
              value={item?.title}
              onChange={(e) => {
                setPartnersData((prev) =>
                  prev.map((i) =>
                    i.uuid === item.uuid ? { ...i, title: e.target.value, name: e.target.value } : i
                  )
                );
              }}
            />
            <label className="text-sm font-bold" htmlFor="logo">
              Partner Logo <span className="text-red-500">*</span>
            </label>
            {logoUrl && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-300">
                <img src={logoUrl} alt="Partner Logo" className="w-full h-auto max-h-20 object-contain" />
              </div>
            )}
            <input
              className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended image size is 426×200 pixels.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:w-1/2 w-full">
            <label className="text-sm font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              className="bg-gray-100 p-3 sm:p-4 w-full rounded-xl resize-none outline-none focus:border-pri-color border-1 text-sm sm:text-base"
              placeholder="Description"
              id="description"
              value={item?.description}
              onChange={(e) => {
                setPartnersData((prev) =>
                  prev.map((i) =>
                    i.uuid === item.uuid ? { ...i, description: e.target.value } : i
                  )
                );
              }}
              style={{ minHeight: 'auto' }} // Removed fixed minHeight for better responsiveness
            ></textarea>
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

export default PartnersCard;