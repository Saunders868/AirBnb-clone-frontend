import React from "react";
import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <Link
      className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
      to={"/account/places/new"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
      Add new place
    </Link>
  );
};

export default AddButton;
