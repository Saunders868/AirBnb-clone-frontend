import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosFetch } from "../utils/fetch";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URI, USER_IMAGE_UPLOAD_URL, USER_URL } from "../constants";
import { useFormik } from "formik";
import { initailRegisterState } from "../utils/data";
import { registerValidationSchema } from "../utils/validation";

const RegisterPage = () => {
  const navigate = useNavigate();

  // handle error and loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState("");

  async function uploadPhoto(e) {
    e.preventDefault();

    if (e.target.files[0].size > 1048576) {
      toast.error("File larger than 1MB", {
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
        data.append("avatar", files[i]);
      }

      const response = await axiosFetch({
        method: "post",
        data: data,
        url: USER_IMAGE_UPLOAD_URL,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFile(response.responseData);
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

  const formik = useFormik({
    initialValues: initailRegisterState,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await axiosFetch({
        method: "post",
        url: USER_URL,
        data: { ...values, avatar: file },
      });

      if (response.status === 409) {
        setError(response.data.msg);

        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (response.status === 200) {
        formik.resetForm();
        toast.success("User created successfully...! ", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        await axiosFetch({
          url: `${USER_URL}/sendMail`,
          method: "post",
          data: {
            name: values.name,
            email: values.email,
            text: `Welcome to my AirBnb clone ${values.name}! I do hope you enjoy :')`,
            subject: "Registered Successfully!",
          },
        });
        navigate("/login");
      }

      setLoading(false);
    },
  });

  return loading ? (
    <Spinner />
  ) : (
    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          placeholder="John Doe"
          id="name"
          {...formik.getFieldProps("name")}
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div>
          <p className="text-sm text-red-500">{formik.errors.name}</p>
        </div>
      ) : null}
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="your@email.com"
          {...formik.getFieldProps("email")}
        />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div>
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        </div>
      ) : null}
      <div>
        <label htmlFor="password">Password: </label>
        <input
          placeholder="password"
          type="password"
          id="ppassword"
          {...formik.getFieldProps("password")}
        />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className="mb-2">
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        </div>
      ) : null}
      <div className="mb-4">
        <div>
          <label htmlFor="avatar" className="block mb-2">
            Profile Image:
          </label>
          {file ? (
            <div className="flex items-center justify-center">
              <div className="overflow-hidden rounded-full w-12 h-12 my-2">
                <img
                  src={BASE_URI + "/uploads/user" + file}
                  className="object-cover aspect-square w-full h-full"
                  alt="user profile"
                />
              </div>
            </div>
          ) : null}
          <label
            id="avatar"
            className="border cursor-pointer flex items-center justify-center gap-1 bg-transparent rounded-2xl p-2 text-2xl text-gray-600"
          >
            <input
              id="avatar"
              type="file"
              className="hidden"
              accept=".png,.jpg"
              name="avatar"
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
      </div>
      <button className="primary" type="submit">
        Register
      </button>
      <div className="text-center py-2 text-gray-500">
        Already a member?{" "}
        <Link className="underline text-black" to={"/login"}>
          login
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
