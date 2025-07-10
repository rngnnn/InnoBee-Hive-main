export const FormField = ({
  label,
  id,
  name,
  type = "text",
  register,
  errors,
  placeholder,
  isRequired = false,
  isTextarea = false,
}) => {
  return (
    <div className="md:w-full w-full flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold m-0">
        {label} {isRequired && <span className="text-red-500 text-sm">*</span>}
      </label>
      {!isTextarea ? (
        <input
          id={id}
          type={type}
          {...register(name)}
          className="h-10 w-full outline-none focus:border-1 focus:border-pri-color bg-white shadow-md rounded-lg px-2"
          placeholder={placeholder}
        />
      ) : (
        <textarea
          id={id}
          rows="10"
          type="text"
          {...register(name)}
          className="h-14 w-full outline-none focus:border-1 focus:border-pri-color bg-white shadow-md rounded-lg p-2"
          placeholder={placeholder}
        />
      )}

      {isRequired && errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};
