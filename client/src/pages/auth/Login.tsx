import { Button, Form, Input, Layout, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { authUser } from '../../store/reducers/auth/ActionCreators';
import { useAppDispatch } from '../../hooks/redux';
import { RouteNames } from '../../components/AppRouter';

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = () => {
    dispatch(authUser({username: '', password: ''}));
    navigate(RouteNames.TABLE);
  }

  const onFinishFailed = () => {
    
  }

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: '40px' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout>
  );
}
 
export default Login;