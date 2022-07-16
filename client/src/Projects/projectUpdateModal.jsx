import { LoadingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Modal, Select, Spin, Tabs, TimePicker, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';

function ProjectUpdateModal({ show, onCreate, onHideModal, projectSelected }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(projectSelected);
  }, [form, projectSelected]);

  const onFinish = value => {
    onCreate(value);
    onHideModal();
  };

  return (
    <Modal
      key="projectUpdateModal"
      width={600}
      title="Chỉnh sửa dự án"
      visible={show}
      onCancel={() => {
        onHideModal();
      }}
      footer={null}
    >
      {projectSelected && (
        <Form
          form={form}
          name="projectUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: projectSelected.name,
            description: projectSelected.description,
            category: projectSelected.category,
          }}
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
            <Select defaultValue={projectSelected.category} style={{ width: 120 }}>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default ProjectUpdateModal;
