import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_URL } from "../constants";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import Spinner from "./Spinner";
import { UserContext } from "../context/UserContext";

export default function DropdownMenu({ dropDown, user, setDropdownState }) {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function closeDropdown() {
    setDropdownState(false);
  }

  async function logout() {
    setLoading(true);

    const response = await axiosFetch({
      method: "post",
      url: LOGOUT_URL,
    });

    if (response.status === 200) {
      toast.success(response.responseData.msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setUser(null);
    } else {
      setError("Server Error Occurred. Please try again later.");
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

    closeDropdown();
    navigate("/login");

    setLoading(false);
  }

  return loading ? (
    <Spinner />
  ) : (
    <div
      id="dropdownDots"
      className={
        dropDown
          ? "z-10 -left-20 bg-white absolute top-12 divide-y divide-gray-100 rounded-lg shadow w-44"
          : "hidden"
      }
    >
      {user ? (
        <div className="px-4 py-3 text-sm text-gray-900">
          <div>{user.name}</div>
          <div className="font-medium truncate">{user.email}</div>
        </div>
      ) : null}
      <ul
        className="py-2 text-sm text-gray-700 "
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <Link
            onClick={closeDropdown}
            to={"/account"}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Account
          </Link>
        </li>
        {/* <li>
          <a
            onClick={closeDropdown}
            href="#"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            onClick={closeDropdown}
            href="#"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Earnings
          </a>
        </li> */}
      </ul>
      <div className="py-2">
        {user ? (
          <p
            onClick={logout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </p>
        ) : (
          <Link
            onClick={closeDropdown}
            to={"/login"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
