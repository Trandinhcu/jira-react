import React from 'react';
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { useUserActions } from '_actions/user';
import logo from 'App/assets/images/logo-color.png';

const FormLogin = () => {
  const userActions = useUserActions();
  const handlerLoginUser = async values => {
    try {
      await userActions.login(values);
      message.info('Đăng nhập thành công');
    } catch (e) {
      message.error('Email or password incorect');
    }
  };

  return (
    <>
      <img className="img-logo" src={logo} />
      <Card bordered={false} style={{ width: '100%' }} className="p-2">
        <h1 className="text-left mb-4 fs-4 fw-bold">Welcome to Jira</h1>
        <h2 className="text-left mb-4 fs-4 fw-semibold">Sign in by entering information below</h2>
        <Form
          className="form-login"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handlerLoginUser}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản !',
              },
            ]}
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Input name="email" placeholder="Tài khoản" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu !',
              },
            ]}
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Input.Password name="password" placeholder="Mật khẩu" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Checkbox checked>Nhớ tài khoản</Checkbox>
            </Form.Item>
            <a href="/#" className="mt-2">
              Quên mật khẩu ?
            </a>
          </div>

          <Button type="primary" htmlType="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default FormLogin;
