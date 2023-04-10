import React, { useState } from "react";
import { BASE_URI, IMAGE_LINK_URL, IMAGE_UPLOAD_URL } from "../constants";
import { axiosFetch } from "../utils/fetch";
import { preInput } from "../utils/utils";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function ImageUploadController({
  label,
  id,
  description,
  getFieldProps,
  values,
  addedPhotos,
  setAddedPhotos,
  resetForm,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addPhotoLink(e) {
    e.preventDefault();
    setLoading(true);
    const response = await axiosFetch({
      method: "post",
      url: IMAGE_LINK_URL,
      data: {
        link: values.photoLink,
      },
    });

    if (response.status === 500) {
      response.data.error.message
        ? setError(response.data.error.message)
        : setError(response.statusText);
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

    if (response.status === 200) {
      setAddedPhotos([...addedPhotos, response.responseData]);
      toast.success("File added!", {
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

    // resetForm({
    //   values: {
    //     photoLink: "",
    //   },
    // });
    setLoading(false);
  }

  async function uploadPhoto(e) {
    e.preventDefault();

    if (e.target.files[0].size > 1048576) {
      toast.error("File too large!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      e.target.value = "";
    } else {
      const files = e.target.files;
      const data = new FormData();
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }

      const response = await axiosFetch({
        method: "post",
        data: data,
        url: IMAGE_UPLOAD_URL,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setAddedPhotos([...addedPhotos, ...response.responseData]);
      }

      if (response.status === 500) {
        response.data.error.message
          ? setError(response.data.error.message)
          : setError(response.statusText);
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
    }
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    setAddedPhotos(addedPhotos.filter((photo) => photo !== filename));
  }

  function setAsFeaturedPhoto(e, filename) {
    e.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    setAddedPhotos([filename, ...addedPhotosWithoutSelected]);
  }
  return loading ? (
    <Spinner />
  ) : (
    <>
      {preInput({
        label,
        id,
        description,
      })}

      <div className="flex gap-2">
        <label htmlFor="photoLink" aria-hidden="true" className="hidden">
          Add using link
        </label>
        <input
          type="text"
          id="photoLink"
          {...getFieldProps("photoLink")}
          placeholder="Add using a link ... jpg"
        />
        <button onClick={addPhotoLink} className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
      </div>

      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
        {addedPhotos && addedPhotos.length > 0
          ? addedPhotos.map((link) => (
              <div className="flex relative h-40 overflow-hidden" key={link}>
                <img
                  className="object-cover h-full w-full rounded-2xl"
                  src={BASE_URI + "/uploads/" + link}
                  alt="house"
                />
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="absolute cursor-pointer bottom-2 right-2 bg-white p-2 rounded-full text-red-600"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => setAsFeaturedPhoto(e, link)}
                  className="absolute cursor-pointer bottom-2 left-2 bg-white p-2 rounded-full text-yellow-500"
                >
                  {link === addedPhotos[0] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
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
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))
          : null}
        <label
          id="photos"
          className="border cursor-pointer flex items-center justify-center gap-1 bg-transparent rounded-2xl p-2 text-2xl text-gray-600"
        >
          <input
            multiple
            type="file"
            className="hidden"
            accept=".png,.jpg"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default ImageUploadController;
