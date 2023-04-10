import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { PLACES_URL } from "../constants";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import BookingWidget from "../components/BookingWidget";
import Gallery from "../components/Gallery";
import FullPageGallery from "../components/FullPageGallery";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);

  const URL = `${PLACES_URL}/${id}`;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosFetch({
        url: URL,
        method: "get",
      });

      if (res.status === 200) {
        setPlace(res.responseData);
      }

      if (res.status !== 200) {
        setError(res.data.err ? res.data.err : "A server error occured");
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
    };
    fetchData();
  }, []);

  if (showPhotos)
    return (
      <FullPageGallery place={place} setShowPhotos={setShowPhotos} />
    );

  return loading ? (
    <Spinner />
  ) : (
    <>
      {place ? (
        <div className="mt-4 py-8 bg-gray-100 -mx-8 px-8 ">
          <h1 className="text-3xl">{place.title}</h1>
          <a
            className="underline my-3 font-semibold flex gap-1"
            target={"_blank"}
            rel="noreferrer"
            href={"https://maps.google.com/?q=" + place.address}
          >
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            {place.address}
          </a>
          <Gallery place={place} setShowPhotos={setShowPhotos} />

          <div className="md:grid my-8 gap-8 grid-cols-2">
            <div>
              <div className="mb-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}.
              </div>
              <b>Check-in: </b> {place.checkIn} <br />
              <b>Check-out: </b> {place.checkOut} <br />
              <b>Max number of guests: </b> {place.maxGuests} <br />
            </div>

            <div className="mt-4 md:mt-0">
              <BookingWidget place={place} />
            </div>
          </div>

          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div>
        </div>
      ) : (
        <div>Place does not exist</div>
      )}
    </>
  );
};

export default PlacePage;
