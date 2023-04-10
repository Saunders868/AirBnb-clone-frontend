import { useFormik } from "formik";
import React, { useEffect } from "react";
import { CREATE_PLACE_URL, PLACES_URL } from "../constants";
import { initialPlaceState } from "../utils/data";
import { axiosFetch } from "../utils/fetch";
import { placeValidationSchema } from "../utils/validation";
import { toast } from "react-toastify";
import TextInputWithLabel from "./HOC/InputWithLabel";
import ImageUploadController from "./ImageUploadController";
import TextAreaInputWithLabel from "./HOC/TextAreaWithLabel";
import Perks from "./Perks";
import CheckInOut from "./CheckInOut";
import { useState } from "react";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";

const Form = ({ setLoading, response, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [addedPhotos, setAddedPhotos] = useState([]);

  let initialData;
  let URL;
  let method;
  let message;
  let newPlace;

  if (response) {
    initialData = {
      title: response.title || "",
      address: response.address || "",
      photos: response.photos || [],
      photoLink: "",
      description: response.description || "",
      perks: response.perks || [],
      extraInfo: response.extraInfo || "",
      checkIn: response.checkIn || "",
      checkOut: response.checkOut || "",
      maxGuests: response.maxGuests || 0,
      price: response.price || 0,
    };

    URL = PLACES_URL + "/" + id;
    method = "patch";
    message = "Listing Updated Successfully!";
    newPlace = false;
  } else {
    initialData = initialPlaceState;
    URL = CREATE_PLACE_URL;
    method = "post";
    message = "Listing Created Successfully!";
    newPlace = true;
  }

  useEffect(() => {
    if (!newPlace) {
      setAddedPhotos(response.photos);
    }
  }, [response, newPlace]);

  const {
    touched,
    getFieldProps,
    errors,
    resetForm,
    handleChange,
    handleBlur,
    values,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: placeValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const response = await axiosFetch({
        method: method,
        url: URL,
        data: {
          title: values.title,
          description: values.description,
          address: values.address,
          maxGuests: values.maxGuests,
          perks: values.perks,
          extraInfo: values.extraInfo,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          photos: addedPhotos,
          price: values.price,
        },
      });

      if (response.status === 200) {
        toast.success(message, {
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

      if (response.status === 401) {
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

      if (response.status === 500) {
        setError(response.data.err);
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
      resetForm();
      navigate("/account/places");
    },
  });

  // console.log(values);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <TextInputWithLabel
            label={"Title"}
            id={"title"}
            description={
              "Title for your place. should be short and catchy as in advertisement."
            }
            touched={touched.title}
            errors={errors.title}
            getFieldProps={getFieldProps}
            placeholder={"title, for example: My lovely appartment"}
          />
        </div>
        <div>
          <TextInputWithLabel
            label={"Address"}
            id={"address"}
            description={"Let us know where to find your listing."}
            touched={touched.address}
            errors={errors.address}
            getFieldProps={getFieldProps}
            placeholder={"title, for example: My lovely appartment"}
          />
        </div>
        <div>
          <ImageUploadController
            label={"Photos"}
            id="photos"
            description={"More = better."}
            getFieldProps={getFieldProps}
            values={values}
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
            resetForm={resetForm}
          />
        </div>
        <div>
          <TextAreaInputWithLabel
            label={"Description"}
            id={"description"}
            description={
              "Describe your listing in a few words us know where to find your listing."
            }
            touched={touched.description}
            errors={errors.description}
            getFieldProps={getFieldProps}
          />
        </div>
        <div>
          <Perks
            handleBlur={handleBlur}
            handleChange={handleChange}
            getFieldProps={getFieldProps}
            selected={response ? response.perks : null}
          />
        </div>
        <div>
          <TextAreaInputWithLabel
            label={"Extra Info"}
            id={"extraInfo"}
            description={"house rules, etc."}
            getFieldProps={getFieldProps}
          />
        </div>
        <div>
          <CheckInOut
            getFieldProps={getFieldProps}
            touched={touched}
            errors={errors}
          />
        </div>

        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </>
  );
};

export default Form;
