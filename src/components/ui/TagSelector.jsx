import React from "react";
import { useFieldArray } from "react-hook-form";

const TagSelector = ({ control, name, availableTags, label, errors }) => {
  const {
    fields: selectedTags,
    append,
    remove,
  } = useFieldArray({ control, name });

  const handleAddTag = (tag) => {
    if (!selectedTags.some((field) => field.value === tag)) {
      append({ value: tag });
    }
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold">
        {label} <span className="text-red-500">*</span>
      </h3>

      {/* Selected Tags Field */}
      <div className="relative w-full min-h-[45px] border-2 bg-white shadow-md rounded-lg px-2 py-1 flex flex-wrap items-center gap-2">
        {selectedTags.map((field, index) => (
          <span
            key={field.id}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
          >
            {field.value}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-xs font-bold hover:text-red-700"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Available Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleAddTag(tag)}
            className={`px-3 py-1 rounded-full text-gray-700 transition ${
              selectedTags.some((field) => field.value === tag)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={selectedTags.some((field) => field.value === tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-sm  mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TagSelector;
