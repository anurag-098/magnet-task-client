import { createBrowserRouter } from "react-router-dom";
import List from "./src/pages/List";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import SingleTask from "./src/pages/SingleTask";
import ProtectedRoute from "./src/utils/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute to={<List />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/single/:id",
    element: <ProtectedRoute to={<SingleTask />} />,
  },
]);
