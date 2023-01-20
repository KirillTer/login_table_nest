import { Menu } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import MenuItem from "antd/lib/menu/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteNames } from './AppRouter'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
        {
      key: "/table",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.TABLE),
      label: 'Table'
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode="horizontal"
          defaultSelectedKeys={location.pathname === RouteNames.HOME ? [RouteNames.LOGIN] : [location.pathname]}
          items={menuItems}
        />
      </Header>
    </Layout>
  );
}
 
export default Navbar;