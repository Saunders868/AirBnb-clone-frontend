import React from "react";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
import { BASE_URI } from "../constants";

const Home = ({ response, loading, error }) => {
  return loading ? (
    <Spinner />
  ) : (
    <>
      {response.length > 0 ? (
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {response.map((place) => (
            <Link to={'/place/'+place._id} key={place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={BASE_URI + "/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address.substring(0, 20)}...</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1"><span className="font-bold"> ${place.price}</span> USD per night</div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p>No places have been added yet</p>
        </div>
      )}
    </>
  );
};

export default Home;
