import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Form from "../components/Form";
import WithPreloadedData from "../components/HOC/WithPreloadedData";
import Spinner from "../components/Spinner";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

const FormWithPreloadedData = WithPreloadedData(Form);

const EditPlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = `/api/places/${id}`;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    const res = await axiosFetch({
      url: URL,
      method: "delete",
    });

    if (res.status === 200) {
      toast.success("Resource deleted successfully...! ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/account/places");
    }

    if (res.status === 500) {
      res.data.error.message
        ? setError(res.data.error.message)
        : setError(res.statusText);
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

  if (loading) return <Spinner />;

  if (showModal)
    return (
      <Modal
        setShowModal={setShowModal}
        confirmFunction={handleDelete}
        title="Are you sure?"
      />
    );

  return (
    <>
      <AccountNav edit />
      <div>
        <FormWithPreloadedData setLoading={setLoading} url={URL} />
        <button className="secondary" onClick={() => setShowModal(true)}>
          Remove Place
        </button>
      </div>
    </>
  );
};

export default EditPlacePage;
