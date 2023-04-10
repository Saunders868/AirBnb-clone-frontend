import React from "react";
import { preInput } from "../utils/utils";

const CheckInOut = ({ getFieldProps, touched, errors }) => {
  return (
    <>
      {preInput({
        label: "Check in & out times",
        id: "checkInOut",
        description:
          "add check in and out times, remember to have some time window for cleaning the room between guests",
      })}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2" id="checkInOut">
        <div>
          <label htmlFor="checkIn" className="mt-2 mb-1">
            Check in time
          </label>
          <input type="time" id="checkIn" {...getFieldProps("checkIn")} />
        </div>
        <div>
          <label htmlFor="checkOut" className="mt-2 mb-1">
            Check out time
          </label>
          <input type="time" id="checkIn" {...getFieldProps("checkOut")} />
        </div>
        <div>
          <label htmlFor="maxGuests" className="mt-2 mb-1">
            Maximum number of guests
          </label>
          <input type="number" min={0} id="maxGuests" {...getFieldProps("maxGuests")} />
        </div>
        <div>
          <label htmlFor="price" className="mt-2 mb-1">
            Price per night
          </label>
          <input type="number" id="price" {...getFieldProps("price")} />
        </div>
      </div>
      {touched.maxGuests && errors.maxGuests ? (
        <div>
          <p className="text-sm text-red-500">{errors.maxGuests}</p>
        </div>
      ) : null}
      {touched.price && errors.price ? (
        <div>
          <p className="text-sm text-red-500">{errors.price}</p>
        </div>
      ) : null}
    </>
  );
};

export default CheckInOut;
