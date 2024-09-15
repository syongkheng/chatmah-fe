import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import * as Page from "./pages";
import RouteConstants from "./constants/RouteConstants";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Page.Error />,
    children: [
      {
        index: true,
        element: <Page.Landing />,
      },
      {
        path: RouteConstants.LOGIN,
        element: <Page.Login />
      },
      {
        path: RouteConstants.REGISTER,
        element: <Page.Register />
      },
      {
        path: RouteConstants.HOME,
        element: <Page.Home />
      }
    ],
  },
]);

export default Router;