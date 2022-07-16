import React from 'react';
import { Tag, Menu, Dropdown, Button } from 'antd';
import { DeleteOutlined, UnorderedListOutlined, EditOutlined } from '@ant-design/icons';

export const BASE_COLUMNS_CONFIG = () => [
  {
    title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>STT</div>,
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 100,
    fixed: 'left',
    render: id =>
      id && (
        <a style={{ color: '#00aefd' }} href="#">
          {id}
        </a>
      ),
  },
  {
    title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Tên dự án</div>,
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Mô tả dự án</div>,
    dataIndex: 'description',
    key: 'description',
    align: 'center',
  },
  {
    title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Ngày tạo</div>,
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: createdAt => createdAt.format('DD/MM/YYYY'),
  },
  {
    title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Thao tác</div>,
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 300,
    render: (action, row) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgb(106, 90, 249)',
            borderColor: 'rgb(106, 90, 249)',
            padding: '1rem 2rem',
            boxShadow: 'rgb(106 90 249 / 24%) 0px 8px 16px 0px',
            height: '40px',
            borderRadius: '5px',
            color: '#fff',
            marginRight: '5px',
          }}
        >
          Chỉnh sửa
        </Button> */}
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgb(0,208,130)',
            borderColor: 'rgb(0,208,130)',
            padding: '6px 14px',
            boxShadow: 'rgb(0 208 130/ 24%) 0px 8px 16px 0px',
            height: '40px',
            borderRadius: '5px',
            color: '#fff',
            marginRight: '7px',
          }}
          onClick={() => row.actionDetail(row.id)}
        >
          <UnorderedListOutlined />
        </Button>
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffa400',
            borderColor: '#ffa400',
            padding: '6px 14px',
            boxShadow: 'rgb(255 164 0/ 24%) 0px 8px 16px 0px',
            height: '40px',
            borderRadius: '5px',
            color: '#fff',
            marginRight: '7px',
          }}
          onClick={() => row.actionEdit(row)}
        >
          <EditOutlined />
        </Button>
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f26651',
            borderColor: '#f26651',
            padding: '6px 14px',
            boxShadow: 'rgb(242 102 81 / 24%) 0px 8px 16px 0px',
            height: '40px',
            borderRadius: '5px',
            color: '#fff',
          }}
          onClick={() => row.actionDelete(row.id)}
        >
          <DeleteOutlined />
        </Button>
      </div>
    ),
  },
];
