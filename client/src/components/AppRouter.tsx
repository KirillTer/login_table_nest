import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LoginContainer from "../pages/auth/Login";
import TableContainer from "../pages/dashboard/Table";
import ErrorContainer from "../pages/errorPage/errorPage";

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  TABLE = '/table',
  ANYPATH = '*'
}

const router = createBrowserRouter([
  {
    path: RouteNames.HOME,
    element: <App />,
    errorElement: <ErrorContainer />,
    children: [
      {
        index: true,
        element: <LoginContainer />
      },
      {
        path: RouteNames.LOGIN,
        element: <LoginContainer />
      },
      {
        path: RouteNames.TABLE,
        element: <TableContainer />
      },
    ],
  }
]);
  
const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
}
 
export default AppRouter;