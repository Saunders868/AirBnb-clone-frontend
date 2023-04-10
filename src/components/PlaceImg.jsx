import React from "react";
import { BASE_URI } from "../constants";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover w-full aspect-square h-full";
  }
  return (
    <img
      className={className}
      src={BASE_URI + "/uploads/" + place.photos[index]}
      alt="featured"
    />
  );
};

export default PlaceImg;
