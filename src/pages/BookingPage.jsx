import { differenceInCalendarDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import FullPageGallery from "../components/FullPageGallery";
import Gallery from "../components/Gallery";
import Spinner from "../components/Spinner";
import { BOOKINGS_URL } from "../constants";
import { bookingInitialState } from "../utils/data";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPhotos, setShowPhotos] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(bookingInitialState);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosFetch({
        method: "get",
        url: `${BOOKINGS_URL}/${id}`,
      });
      setBooking(res.responseData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCancel = async () => {
    setLoading(true);
    const res = await axiosFetch({
      method: "delete",
      url: `${BOOKINGS_URL}/${id}`,
    });
    if (res.status === 200) {
      toast.success("Booking cancelled successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      navigate("/account/bookings");
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
  };

  if (loading) return <Spinner />;

  if (showModal)
    return (
      <Modal
        setShowModal={setShowModal}
        confirmFunction={handleCancel}
        title="Cancel Booking Confirmation"
      />
    );

  if (showPhotos)
    return (
      <FullPageGallery place={booking.place} setShowPhotos={setShowPhotos} />
    );

  if (!booking) return "";

  return (
    <>
      {booking ? (
        <div className="my-8">
          <h1 className="text-3xl">{booking.place.title}</h1>
          <div className="bg-gray-200 p-6 my-6 flex rounded-2xl justify-between items-center">
            <div>
              <h2 className="text-2xl">Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div>Total Price</div>
              <div className="text-3xl">
                $
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                ) * booking.place.price}{" "}
                <b>USD</b>
              </div>
            </div>
          </div>
          <Gallery place={booking?.place} setShowPhotos={setShowPhotos} />
          <div className="my-6">
            <h3 className="text-3xl">Description</h3>
            <p className="text-sm text-gray-800">
              {" "}
              {booking.place.description}
            </p>
          </div>

          <button onClick={() => setShowModal(true)} className="primary">
            Cancel Booking
          </button>
        </div>
      ) : null}
    </>
  );
};

export default BookingPage;
