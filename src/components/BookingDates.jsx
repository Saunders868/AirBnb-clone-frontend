import { differenceInCalendarDays, format } from "date-fns";
import React from "react";

const BookingDates = ({ booking }) => {
  return (
    <>
      <div className="mb-2">
        <b>FROM</b> {format(new Date(booking.checkIn), "yyyy-MM-dd")}{" "}
        <b>UNTIL</b> {format(new Date(booking.checkOut), "yyyy-MM-dd")}
      </div>
      <div className="md:flex border-t border-black py-4 gap-4">
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}{" "}
          night(s)
        </div>{" "}
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
          Price: $
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          ) * booking.place.price}{" "}
          <b>USD</b>
        </div>
      </div>
    </>
  );
};

export default BookingDates;
