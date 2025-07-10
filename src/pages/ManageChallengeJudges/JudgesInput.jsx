import React from 'react';

const JudgesInput = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="bg-gray-100 w-full px-4 py-2 rounded-xl outline-none focus:border-pri-color border-1 mb-2"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default JudgesInput;