import { Select } from "antd";
import { Controller } from "react-hook-form";

const SelectField = ({
  name,
  control,
  label,
  placeholder,
  options,
  errors,
  isRequired = false,
  mode,
  value, // Add value prop for standalone usage
  onChange, // Add onChange prop for standalone usage
}) => {
  if (control) {
    // Use with react-hook-form
    return (
      <div className="md:w-full w-full flex flex-col gap-1">
        <label className="font-semibold">
          {label} {isRequired && <span className="text-red-500 text-sm">*</span>}
        </label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              showSearch
              placeholder={placeholder}
              mode={mode}
              className="w-full"
              options={options}
              value={field.value || []}
              maxTagCount="responsive"
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          )}
        />

        {errors && errors[name] && (
          <p className="text-red-500 text-sm">{errors[name]?.message}</p>
        )}
      </div>
    );
  } else {
    // Standalone usage with value and onChange
    return (
      <div className="md:w-full w-full flex flex-col gap-1">
        <label className="font-semibold">
          {label} {isRequired && <span className="text-red-500 text-sm">*</span>}
        </label>

        <Select
          showSearch
          placeholder={placeholder}
          mode={mode}
          className="w-full"
          options={options}
          value={value}
          onChange={onChange}
          maxTagCount="responsive"
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    );
  }
};

export default SelectField;