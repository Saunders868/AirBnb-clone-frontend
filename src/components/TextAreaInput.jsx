import React from "react";

const TextAreaInput = ({
  touched,
  errors,
  getFieldProps,
  field,
  placeholder,
}) => {
  return (
    <>
      <textarea
        id={field}
        className={touched && errors ? "border border-red-500" : ""}
        {...getFieldProps(field)}
        cols="30"
        rows="10"
        placeholder={placeholder}
      ></textarea>
      {touched && errors ? (
        <div>
          <p className="text-sm text-red-500">{errors}</p>
        </div>
      ) : null}
    </>
  );
};

export default TextAreaInput;
