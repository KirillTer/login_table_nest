import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from "react-router-dom";
import App from "../App";
import LoginContainer from "../pages/auth/Login";
import TableContainer from "../pages/dashboard/PostContainer";
import ErrorContainer from "../pages/errorPage/errorPage";

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  TABLE = '/table',
  ANYPATH = '*'
}
  
const AppRouter = () => {


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
          element: <TableContainer />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
 
export default AppRouter;