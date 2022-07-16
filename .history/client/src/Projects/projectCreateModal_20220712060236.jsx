import { Button, Select, Form, Input, Modal } from 'antd';
import React from 'react';

function ProjectCreateModal({ show, onCreate, onHideModal }) {
  const [form] = Form.useForm();

  const onFinish = value => {
    onCreate(value);
    onHideModal();
    form.resetFields();
  };

  return (
    <Modal
      key="projectCreateModal"
      width={600}
      title={'Tạo dự án'}
      visible={show}
      onCancel={() => {
        onHideModal();
      }}
      footer={null}
    >
      <Form
        form={form}
        name="projectCreateModal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên dự án"
          name="name"
          rules={[{ required: true, message: 'Tên dự án không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả dự án"
          name="description"
          rules={[{ required: true, message: 'Mô tả dự án không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thể loại dự án"
          name="category"
          rules={[{ required: true, message: 'Thể loại dự án không được để trống!' }]}
        >
          <Select defaultValue="" style={{ width: 120 }}>
            <Option value="software">Software</Option>
            <Option value="marketing">Marketing</Option>
            <Option value="business">Business</Option>
          </Select>
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

export default ProjectCreateModal;
