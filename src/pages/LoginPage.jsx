import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { SESSION_URL } from "../constants";
import { useFormik } from "formik";
import { initailLoginState } from "../utils/data";
import { loginValidationSchema } from "../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();

  // handle loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // context
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: initailLoginState,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const response = await axiosFetch({
        method: "post",
        url: SESSION_URL,
        data: values,
      });

      switch (response.status) {
        case 401:
          setError(response.data.msg);

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
          break;

        case 404:
          setError(response.data.msg);

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
          break;

        case 200:
          toast.success("Logged in successfully...!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setUser(response.responseData);
          formik.resetForm();
          navigate("/");
          break;

        default:
          break;
      }

      setLoading(false);
    },
  });

  if (loading) return <Spinner />;

  return (
    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email" className="hidden">
          Email
        </label>
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
        <label htmlFor="password" className="hidden">
          Password
        </label>
        <input
          placeholder="password"
          type="password"
          id="password"
          {...formik.getFieldProps("password")}
        />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <div className="mb-2">
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        </div>
      ) : null}

      <button type="submit" className="primary">
        Login
      </button>
      <div className="text-center py-2 text-gray-500">
        Don't have an account?{" "}
        <Link className="underline text-black" to={"/register"}>
          Register Now
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
