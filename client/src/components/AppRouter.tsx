import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const publicRouter = createBrowserRouter([
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
    ],
  }
]);

const privateRouter = createBrowserRouter([
  {
    path: RouteNames.HOME,
    element: <App />,
    errorElement: <ErrorContainer />,
    children: [
      {
        index: true,
        element: <TableContainer />
      },
      {
        path: RouteNames.TABLE,
        element: <TableContainer />
      },
    ],
  }
]);
  
const AppRouter = () => {
  const logined = useAppSelector(state => state.authReducer.isAuth);
  const [isLogin, setIsLogin] = useState(logined);
console.log('comp', logined)
  useEffect(() => {
    console.log('effect', logined)
    setIsLogin(logined);
  }, [logined]);

  return (
    <>
    {console.log('render', logined)}
    <RouterProvider router={isLogin ? privateRouter : publicRouter} />
    </>
  );
}
 
export default AppRouter;