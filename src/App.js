import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Error from "./pages/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import store from "./redux/store";
import Profile from "./pages/Profile";
import CreateBlog from "./components/CreateBlog";
import EditProfile from "./components/EditProfile";
import PostInfo from "./components/PostInfo";
import UserProfile from "./pages/UserProfile";
import Modal from "./pages/Modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/create",
        element: <CreateBlog />,
      },
      {
        path: "/edit",
        element: <EditProfile />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/blog/:id",
        element: <PostInfo />,
      },
      {
        path: "/user/:id",
        element: <UserProfile />,
      },
      {
        path: "/modal",
        element: <Modal />,
      },
    ],
  },
]);

function LayoutComponent() {
  return (
    <div className="font-poppins max-w-full justify-center">
      <div className=" min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
