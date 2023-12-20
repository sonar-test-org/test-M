import { DatePickerCustom } from "../../DatePickerCustom";
import { SelectDropdown } from "../../SelectDropdown";
import { TextFieldCustom } from "../../TextFieldCustom/TextFieldCustom";
import { Lookup } from "../Lookup";

const Input = ({
  type = "text",
  label,
  name,
  value,
  options = [],

  disabled = false,
  required = false,
  error = false,

  onChange = () => {},
  onBlur = () => {},
  asyncMethod,

  sx,
  characterLimit,
  dateFormat = "MM/DD/YYYY",
  ...props
}) => {
 
  const generateInputs = () => {
    switch (type) {
      case "text":
        return (
          <TextFieldCustom
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            sx={{ flexGrow: 1, ...sx }}
            required={required}
            error={error}
            onBlur={onBlur}
            type="text"
            characterLimit={characterLimit}
          />
        );
      case "number":
        return (
          <TextFieldCustom
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            sx={{ flexGrow: 1, ...sx }}
            required={required}
            error={error}
            onBlur={onBlur}
            type="number"
            characterLimit={characterLimit}
          />
        );
      case "dropdown":
        return (
          <SelectDropdown
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            sx={{ flexGrow: 1, ...sx }}
            required={required}
            error={error}
            onBlur={onBlur}
            disabled={disabled}
          />
        );
      case "date":
        return (
          <DatePickerCustom
            label={label}
            value={value}
            handleChangeDate={(val) =>
              onChange({ target: { value: val, name } })
            }
            sx={{ flexGrow: 1, width: "auto !important", ...sx }}
            required={required}
            inputFormat={dateFormat}
            error={error}
            name={name}
            disabled={disabled}
            {...props}
          />
        );
      case "password":
        return (
          <TextFieldCustom
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            sx={{ flexGrow: 1, ...sx }}
            required={required}
            error={error}
            onBlur={onBlur}
            type={type}
            characterLimit={characterLimit}
          />
        );

      case "lookup":
        return (
          <Lookup
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            asyncMethod={asyncMethod}
            disabled={disabled}
            sx={{ flexGrow: 1, ...sx }}
            required={required}
            error={error}
            onBlur={onBlur}
            characterLimit={characterLimit}
            {...props}
          />
        );

      default:
        return;
    }
  };

  return <>{generateInputs()}</>;
};

export default Input;
