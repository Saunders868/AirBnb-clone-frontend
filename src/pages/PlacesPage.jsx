import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import Spinner from "../components/Spinner";
import PlacesList from "../components/PlacesList";
import Form from "../components/Form";
import WithPreloadedData from "../components/HOC/WithPreloadedData";
import { GET_PLACES_URL } from "../constants";

const PlacesListWithPreloadedData = WithPreloadedData(PlacesList);

const PlacesPage = () => {
  const { action } = useParams();
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {action !== "new" ? (
        <>
          <div className="text-center">
            <AddButton />
          </div>

          <PlacesListWithPreloadedData url={GET_PLACES_URL} />
        </>
      ) : null}
      {action === "new" ? (
        <div>
          <Form setLoading={setLoading} />
        </div>
      ) : null}
    </div>
  );
};

export default PlacesPage;
