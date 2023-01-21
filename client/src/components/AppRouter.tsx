import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from "react-router-dom";
import { useAppSelector } from '../hooks/redux'
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
  
const AppRouter = () => {
  const logined = useAppSelector(state => state.authReducer.isAuth);

console.log('comp', logined)

  const loader = () => {
    return logined;
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
          element: <TableContainer />,
          loader: loader,
        },
      ],
    }
  ]);

  return (
    <>
    {console.log('render', logined)}
    <RouterProvider router={router} />
    </>
  );
}
 
export default AppRouter;