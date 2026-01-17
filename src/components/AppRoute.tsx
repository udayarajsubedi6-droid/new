import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollToTop } from "../lib/scroll-to-top";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "contact", element: <ContactPage /> },
      {path:"services/:serviceId", element: <ServicesPage /> },
      {path:"careers/:careerId", element: <CareersPage /> },
      {path:"about/:id", element: <AboutPage /> },

    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
