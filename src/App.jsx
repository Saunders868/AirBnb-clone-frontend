import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WithTitle from "./components/HOC/LoginLogout";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import EditPlacePage from "./pages/EditPlacePage";
import WithPreloadedData from "./components/HOC/WithPreloadedData";
import { PLACES_URL } from "./constants";
import PlacePage from "./pages/PlacePage";
import BookingPage from "./pages/BookingPage";

const LoginPageWithTitle = WithTitle(LoginPage);
const RegisterPageWithTitle = WithTitle(RegisterPage);

const HomeWithPreloadedData = WithPreloadedData(Home);

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeWithPreloadedData url={PLACES_URL} />} />
          <Route path="/login" element={<LoginPageWithTitle title="Login" />} />
          <Route
            path="/register"
            element={<RegisterPageWithTitle title="Register" />}
          />
          <Route path="account/:subpages?" element={<AccountPage />} />
          <Route path="account/:subpages?/:action" element={<AccountPage />} />
          <Route path="account/bookings/:id" element={<BookingPage />} />
          <Route path="account/places/edit/:id" element={<EditPlacePage />} />
          <Route path="place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
