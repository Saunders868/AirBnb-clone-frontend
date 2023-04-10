import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";
import { BOOKINGS_URL, LOGOUT_URL } from "../constants";
import { axiosFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import BookingsPage from "./BookingsPage";
import WithPreloadedData from "../components/HOC/WithPreloadedData";

const BookingsPageWithPreloadedData = WithPreloadedData(BookingsPage);

const AccountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let { subpages } = useParams();

  if (subpages === undefined) {
    subpages = "profile";
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

    navigate("/login");
    setLoading(false);
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (!ready || loading) return <Spinner />;

  return (
    <div>
      <AccountNav />
      {subpages === "profile" ? (
        <div className="text-center max-w-lg mx-auto">
          Logged in as <span className="font-bold">{user.name}</span> (
          {user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      ) : null}
      {subpages === "places" ? <PlacesPage /> : null}
      {subpages === "bookings" ? <BookingsPageWithPreloadedData url={`${BOOKINGS_URL}/user-bookings`} /> : null}
    </div>
  );
};

export default AccountPage;
