const Select = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        className="bg-gray-100 w-full px-4 py-4 rounded-xl outline-none focus:border-pri-color border-1 appearance-none cursor-pointer"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            className="cursor-pointer"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          className="w-8 h-8 text-brown"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" fill="none" width="24" height="24" />
          <g>
            <path d="M7 10l5 5 5-5" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Select;
