import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AuthProvider from "./hooks/AuthProvider";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
        element: <Dashboard />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/signin", element: <Signin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
