import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Explore from "./pages/explore/Explore";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { getUser, getUsers } from "./utilities/typicode";
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
                element: <Explore />,
                loader: getUsers,
            },
            {
                path: "explore/:id",
                element: <Detail />,
                loader: getUser
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }

]);
export default router;