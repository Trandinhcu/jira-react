import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm } from 'antd';
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
  const memberActions = useMembersActions();
  const [members] = useRecoilState(membersAtom);

  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const handleGetAllMember = useCallback(async () => {
    try {
      await memberActions.getAllMembers({ ...pagination, ...filter });
    } catch ({ e }) {
      message.error(data.message);
    }
  });

  useEffect(() => {
    handleGetAllMember();
    setPagination({
      ...pagination,
      total: members.total,
    });
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
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>T??n th??nh vi??n</div>
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
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Thao t??c</div>,
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
            title="B???n c?? mu???n x??a th??nh vi??n n??y"
            onConfirm={() => onDeleteMember(id)}
            okText="X??c nh???n"
            cancelText="H???y"
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
    try {
      await memberActions.createMember({
        name: value.name,
        email: value.email,
        password: value.password,
      });
      handleGetAllMember();
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
    try {
      await memberActions.editMember(memberSelected.id, {
        name: value.name,
        email: value.email,
      });
      handleGetAllMember();
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
          <h1>TH??NH VI??N</h1>
          <Input
            placeholder="T??m ki???m th??nh vi??n"
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
            T???o th??nh vi??n
          </Button>
        </StyledHeader>

        <Table
          columns={columnsConfig}
          dataSource={members}
          pagination={{ pageSize: 10 }}
          style={{
            margin: '10px 0 70px 0',
            paddingBottom: '50px',
          }}
        />

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
