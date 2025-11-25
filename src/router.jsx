import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import Layout from "./Layout";
import { getMovieDetails } from "./utilities/movieApi";
import Loading from "./Components/Loading";
import { ErrorBoundary } from "./Components/Error";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/explore/Explore"));
const Detail = lazy(() => import("./pages/details/Details"));
const Booking = lazy(() => import("./pages/booking/Booking"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const Tickets = lazy(() => import("./pages/tickets/Tickets"));
const Saved = lazy(() => import("./pages/saved/Saved"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

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