import React from "react";
import { useFormContext } from "react-hook-form";

const FileInputWithPreview = ({
  name,
  label,
  setValue,
  image,
  buttonTitle = "Choose Files",
}) => {
  const {
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleImageUpload = (e) => {
    const file = e.target.files[0] || null;
    setValue(name, file);
    if (file) {
      setValue(`${name}Url`, URL.createObjectURL(file));
    } else {
      setValue(`${name}Url`, null);
    }
    trigger(name);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="font-semibold">{label}</p>
      {image && (
        <>
          {watch(`${name}Url`) && (
            <img
              src={watch(`${name}Url`)}
              alt="Preview"
              className="mt-2 mb-2 h-28 w-28 object-cover shadow-brown"
            />
          )}
        </>
      )}
      <label
        htmlFor={name}
        className="border border-brown w-fit py-1 px-5 shadow-brown cursor-pointer mb-1"
      >
        {buttonTitle}
      </label>
      <input
        onChange={handleImageUpload}
        id={name}
        type="file"
        className="hidden"
      />
      {watch(name) && <p>Selected file: {watch(name).name}</p>}
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default FileInputWithPreview;
