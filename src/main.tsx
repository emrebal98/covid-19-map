import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";
import { Root, WorldMap } from "./routes";
import Error from "./features/error/error";
import CountryDetail, {
  loader as countryLoader,
} from "./routes/country-detail";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <WorldMap />,
        errorElement: <Error />,
        children: [
          {
            path: "/:country",
            element: <CountryDetail />,
            loader: countryLoader,
          },
        ],
      },
    ],
  },
]);

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
