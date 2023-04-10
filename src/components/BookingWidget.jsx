import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { bookingValidationSchema } from "../utils/validation";
import { axiosFetch } from "../utils/fetch";
import { BOOKINGS_URL } from "../constants";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  let yourDate = new Date();
  const formatedDate = yourDate.toISOString().split("T")[0];
  let followingDay = new Date(yourDate.getTime() + 86400000);
  const formatedFollowingDay = followingDay.toISOString().split("T")[0];
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    enableReinitialize: true,
    initialValues: {
      checkIn: formatedDate,
      checkOut: formatedFollowingDay,
      maxGuests: 1,
      name: user.name || "",
      mobile: "",
    },
    validationSchema: bookingValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await axiosFetch({
        url: BOOKINGS_URL,
        method: "post",
        data: {
          ...values,
          place: place._id,
        },
      });

      if (res.status === 200) {
        toast.success("Booking confirmed!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (res.status === 401) {
        setError("User not verified!");
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (res.status === 500) {
        setError(res.data.err);
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
      navigate("/account/bookings");
    },
  });
  return loading ? (
    <Spinner />
  ) : (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 grow">
            <label htmlFor="checkIn">Check In: </label>
            <input
              type="date"
              min={formatedDate}
              {...getFieldProps("checkIn")}
              id="checkIn"
            />
          </div>
          <div className="py-3 px-4 grow border-l">
            <label htmlFor="checkOut">Check Out: </label>
            <input
              type="date"
              min={formatedFollowingDay}
              {...getFieldProps("checkOut")}
              id="checkOut"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="maxGuest">Number of guests: </label>
          <input
            type="number"
            {...getFieldProps("maxGuests")}
            max={place.maxGuests}
            id="maxGuest"
          />
          {touched.maxGuests && errors.maxGuests ? (
            <div>
              <p className="text-sm text-red-500">{errors.maxGuests}</p>
            </div>
          ) : null}
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="name">Name: </label>
          <input type="text" {...getFieldProps("name")} id="name" />
          {touched.name && errors.name ? (
            <div>
              <p className="text-sm text-red-500">{errors.name}</p>
            </div>
          ) : null}
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="text"
            placeholder="01-2345-6789"
            {...getFieldProps("mobile")}
            id="mobile"
          />
          {touched.mobile && errors.mobile ? (
            <div>
              <p className="text-sm text-red-500">{errors.mobile}</p>
            </div>
          ) : null}
        </div>
      </div>

      <button type="submit" className="primary mt-4">
        Book this place
      </button>
    </form>
  );
};

export default BookingWidget;
