import React from "react";
import { BASE_URI } from "../constants";

const FullPageGallery = ({ setShowPhotos, place }) => {
  return (
    <div className="absolute inset-0 bg-white min-h-full">
      <div className="p-8 grid gap-4">
        <div>
          <h2 className="text-3xl mb-2">Photos of {place.title}</h2>
          <button
            onClick={() => setShowPhotos(false)}
            className="bg-white fixed shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => (
            <div key={photo}>
              <img src={BASE_URI + "/uploads/" + photo} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FullPageGallery;
