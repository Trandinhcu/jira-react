import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React from 'react';

function MemberCreateModal({ show, onCreate, onHideModal }) {
  const [form] = Form.useForm();

  const onFinish = value => {
    onCreate(value);
    onHideModal();
    form.resetFields();
  };

  return (
    <Modal
      key="memberCreateModal"
      width={600}
      title="Tạo thành viên"
      visible={show}
      onCancel={() => {
        onHideModal();
      }}
      footer={null}
    >
      <Form
        form={form}
        name="memberCreateModal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên thành viên"
          name="name"
          rules={[{ required: true, message: 'Tên thành viên không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              height: '40px',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MemberCreateModal;
