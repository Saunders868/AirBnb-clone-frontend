import { preInput } from "../../utils/utils";
import TextAreaInput from "../TextAreaInput";

export default function TextAreaInputWithLabel({
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
      <TextAreaInput
        touched={touched}
        errors={errors}
        getFieldProps={getFieldProps}
        field={id}
        placeholder={placeholder}
      />
    </>
  );
}
