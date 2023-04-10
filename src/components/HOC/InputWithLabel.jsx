import { preInput } from "../../utils/utils";
import TextInput from "../TextInput";

export default function TextInputWithLabel({
  label,
  id,
  description,
  touched,
  errors,
  getFieldProps,
  placeholder,
}) {
  return (
    <>
      {preInput({
        label,
        id,
        description,
      })}
      <TextInput
        touched={touched}
        errors={errors}
        getFieldProps={getFieldProps}
        field={id}
        placeholder={placeholder}
      />
    </>
  );
}
