import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';

import { useAppDispatch, useAppSelector } from '@/hooks';

import { authSelector } from '@/store/auth/authSelectors';
import { AuthActions } from '@/store/auth/authSlices';

import { ILoginPayload } from '@/types/interfaces/login';

import './Login.scss';

const Login = () => {
  const { login } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const onFinish = (values: ILoginPayload) => {
    dispatch(AuthActions.login(values));
  };

  return (
    <div className="login-container">
      <Card title="Giriş Yap" className="login-card">
        <Form
          name="loginForm"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ email: '', password: '' }}
        >
          <Form.Item
            label="E-Posta"
            name="email"
            rules={[
              { required: true, message: 'E-posta zorunludur!' },
              { type: 'email', message: 'Geçerli bir e-posta giriniz!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-posta adresinizi girin" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Şifre zorunludur!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifrenizi girin" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button" loading={login.loading}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
