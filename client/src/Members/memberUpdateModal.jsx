import { LoadingOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Modal, Select, Spin, Tabs, TimePicker, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';

function MemberUpdateModal({ show, onCreate, onHideModal, memberSelected }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(memberSelected);
  }, [form, memberSelected]);

  const onFinish = value => {
    onCreate(value);
    onHideModal();
  };

  return (
    <Modal
      key="memberUpdateModal"
      width={600}
      title="Chỉnh sửa thành viên"
      visible={show}
      onCancel={() => {
        onHideModal();
      }}
      footer={null}
    >
      {memberSelected && (
        <Form
          form={form}
          name="memberUpdateModal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            fullName: memberSelected.fullName,
          }}
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

export default MemberUpdateModal;
