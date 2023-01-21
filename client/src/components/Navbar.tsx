import { Menu } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/auth/AuthSlice'
import { RouteNames } from './AppRouter';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logined = useAppSelector(state => state.authReducer.isAuth);
  
  const publicMenuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
  ];

  const privateMenuItems = [
    {
      key: "/table",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.TABLE),
      label: 'Dashboard'
    },
    {
      key: "user",
      label: 'Username',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Logout',
          key: 'logout',
          onClick: () => {
            dispatch(authSlice.actions.userAuthLogout());
            navigate(RouteNames.LOGIN);
            console.log('Logout')
          },
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode="horizontal"
          items={logined ? privateMenuItems : publicMenuItems}
          defaultSelectedKeys={((location.pathname === RouteNames.HOME) ? (!logined ? [RouteNames.LOGIN] : [RouteNames.TABLE]) : location.pathname) as string[]}
        />
      </Header>
    </Layout>
  );
}
 
export default Navbar;