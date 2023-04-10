import React from "react";

const TextInput = ({ touched, errors, getFieldProps, field, placeholder }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        id={field}
        className={touched && errors ? "border border-red-500" : ""}
        {...getFieldProps(field)}
      />
      {touched && errors ? (
        <div>
          <p className="text-sm text-red-500">{errors}</p>
        </div>
      ) : null}
    </>
  );
};

export default TextInput;
