import "./index.css";
import { StrictMode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoutes";
import ReviewForm from "./components/ReviewForm";
import ManageReviews from "./components/ManageReviews";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function Applayout() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Outlet />
      <Footer />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Applayout />
      </AuthProvider>
    ),
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/signin", element: <Signin /> },
      {
        path: "campaign/:campaignId",
        element: <ManageReviews />,
      },
    ],
  },
  {
    path: "/submit/:campaignName/:campaignId",
    element: <ReviewForm />,
    errorElement: <div>404 Not Found</div>,
  },
]);

// index.js
createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
