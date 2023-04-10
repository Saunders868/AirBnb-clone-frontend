import React from "react";
import { Link } from "react-router-dom";
import { BASE_URI } from "../constants";
import Spinner from "./Spinner";

const PlacesList = ({ response, loading, error }) => {
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          {error ? (
            <div>An error occured: {error}</div>
          ) : (
            <>
              {response.length > 0 &&
                response.map((place) => (
                  <Link
                    to={`/account/places/edit/${place._id}`}
                    className="cursor-pointer mt-8 bg-gray-100 gap-4 flex p-4 rounded-2xl"
                    key={place._id}
                  >
                    {place.photos.length > 0 && (
                      <div className="flex w-32 h-32 overflow-hidden rounded-xl bg-gray-300 shrink-0">
                          <img
                            className="object-cover w-full"
                            src={BASE_URI + "/uploads/" + place.photos[0]}
                            alt="featured"
                          />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2">
                        {place.description.substring(0, 250)}...
                      </p>
                    </div>
                  </Link>
                ))}

              {response.length === 0 && (
                <div>Start adding Places top populate this area...!</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacesList;
