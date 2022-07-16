import { LoadingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Modal, Select, Spin, Tabs, TimePicker, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';

function ProjectUpdateModal({ show, onCreate, onHideModal, projectSelected }) {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   form.setFieldsValue(projectSelected);
  // }, [form, projectSelected]);

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

          <Form.Item label="Thời gian bắt đầu" name="timeStart">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item label="Thời gian kết thúc" name="timeEnd">
            <DatePicker format="DD/MM/YYYY" />
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
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default ProjectUpdateModal;
