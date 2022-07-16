import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Input, Spin, message } from 'antd';
import ProjectSidebar from 'Project/Sidebar';
import { ProjectPage } from 'Project/Styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMembersActions } from '_actions/member';
import { membersAtom } from '_states/member';
import MemberCreateModal from './memberCreateModal';
import MemberUpdateModal from './memberUpdateModal';
import { ProjectsContainer, StyledHeader } from './Styles';

const Members = () => {
  const [loading, setLoading] = useState(false);
  const memberActions = useMembersActions();
  const [members] = useRecoilState(membersAtom);

  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const handleGetAllMember = useCallback(async () => {
    setLoading(true);
    try {
      await memberActions.getAllMembers({ ...pagination, ...filter });
    } catch ({ e }) {
      message.error(data.message);
    }
    setLoading(false);
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      await handleGetAllMember();
      setPagination({
        ...pagination,
        total: members.total,
      });
      setLoading(false);
    })();
  }, [members.total, pagination.current, filter.searchTerm]);

  const handleTableChange = pagination => {
    setPagination(pagination);
  };

  const handleFilter = e => {
    let tmp = { ...filter };
    tmp[e.target.name] = e.target.value;
    setFilter(tmp);
  };

  // const history = useHistory();
  const [showMemberCreateModal, setShowMemberCreateModal] = useState(false);
  const [showMemberUpdateModal, setShowMemberUpdateModal] = useState(false);
  const [memberSelected, setMemberSelected] = useState(null);

  const columnsConfig = [
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
      title: (
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Tên thành viên</div>
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: name => name,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Email</div>,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: email => email,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Avatar</div>,
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      align: 'center',
      render: avatarUrl => (
        <img src={avatarUrl} style={{ width: '50px', heigh: '50px', borderRadius: '50%' }} />
      ),
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Thao tác</div>,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 300,
      render: (id, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            onClick={() => onEditMember(row)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Bạn có muốn xóa thành viên này"
            onConfirm={() => onDeleteMember(id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
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
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onDeleteMember = async id => {
    try {
      await memberActions.removeMember(id);
      handleGetAllMember();
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
  };

  const onCreateMember = async value => {
    setLoading(true);
    try {
      await memberActions.createMember({
        name: value.name,
        email: value.email,
        password: value.password,
        avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg'
      });
      await handleGetAllMember();
      setLoading(false);
      message.info('Tạo thành viên thành công');
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
  };

  const onEditMember = member => {
    setShowMemberUpdateModal(true);
    setMemberSelected(member);
  };

  const handleUpdateMember = async value => {
    setLoading(true);
    try {
      await memberActions.editMember(memberSelected.id, {
        name: value.name,
        email: value.email,
      });
      await handleGetAllMember();
      setLoading(false);
      message.info('Cập nhật thành viên thành công');
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
  };

  return (
    <ProjectPage>
      <ProjectSidebar />
      <ProjectsContainer>
        <StyledHeader
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>THÀNH VIÊN</h1>
          <Input
            placeholder="Tìm kiếm thành viên"
            name="searchTerm"
            value={filter.searchTerm}
            onChange={handleFilter}
            style={{ width: '30%', borderRadius: '5px', padding: '10px 15px' }}
          />
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#367bf6',
              borderColor: '#367bf6',
              padding: '1rem 2rem',
              boxShadow: 'rgb(0 174 253 / 24%) 0px 8px 16px 0px',
              height: '40px',
              borderRadius: '5px',
            }}
            type="primary"
            onClick={() => {
              setShowMemberCreateModal(true);
            }}
          >
            Tạo thành viên
          </Button>
        </StyledHeader>

        <Spin spinning={loading}>
          <Table
            onChange={handleTableChange}
            columns={columnsConfig}
            dataSource={members.data}
            pagination={pagination}
            style={{
              margin: '10px 0 70px 0',
              paddingBottom: '50px',
            }}
          />
        </Spin>

        <MemberCreateModal
          show={showMemberCreateModal}
          onCreate={onCreateMember}
          onHideModal={() => setShowMemberCreateModal(false)}
        />

        <MemberUpdateModal
          memberSelected={memberSelected}
          show={showMemberUpdateModal}
          onCreate={handleUpdateMember}
          onHideModal={() => setShowMemberUpdateModal(false)}
        />
      </ProjectsContainer>
    </ProjectPage>
  );
};

export default Members;
