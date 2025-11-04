import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Explore from "./pages/explore/Explore";
import Detail from "./pages/details/Details";
import Booking from "./pages/booking/Booking";
import Payment from "./pages/payment/Payment";
import Tickets from "./pages/tickets/Tickets";
import Saved from "./pages/saved/Saved";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/NotFound";
import { getMovieDetails } from "./utilities/movieApi";
import Loading from "./Components/Loading";
import { ErrorBoundary } from "./Components/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        hydrateFallbackElement: <Loading />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "explore",
                element: <Explore />
            },
            {
                path: "explore/:id",
                element: <Detail />,
                loader: getMovieDetails
            },
            {
                path: "booking/:id",
                element: <Booking />
            },
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "tickets",
                element: <Tickets />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "saved",
                element: <Saved />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }

]);
export default router;