import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Input, message, Spin } from 'antd';
import moment from 'moment';
import ProjectSidebar from 'Project/Sidebar';
import { ProjectPage } from 'Project/Styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { useProjectActions } from '_actions/project';
import { projectsAtom } from '_states/project';
import ProjectCreateModal from './projectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';
import { ProjectsContainer, StyledHeader } from './Styles';
import { isAdmin } from 'Auth/role';

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const projectActions = useProjectActions();
  const [projects] = useRecoilState(projectsAtom);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [filter, setFilter] = useState({});

  const handleGetAllProject = useCallback(async () => {
    setLoading(true);
    try {
      await projectActions.getAllProject({ ...pagination, ...filter });
    } catch (e) {
      message.error(e.message);
    }
    setLoading(false);
  });

  useEffect(() => {
    handleGetAllProject();
    setPagination({
      ...pagination,
      total: projects.total,
    });
  }, [projects.total, pagination.current, filter.searchTerm]);

  const handleTableChange = pagination => {
    setPagination(pagination);
  };

  const handleFilter = e => {
    let tmp = { ...filter };
    tmp[e.target.name] = e.target.value;
    setFilter(tmp);
  };

  const history = useHistory();
  const [showProjectCreateModal, setShowProjectCreateModal] = useState(false);
  const [showProjectUpdateModal, setShowProjectUpdateModal] = useState(false);
  const [projectSelected, setProjectSelected] = useState(null);

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
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Tên dự án</div>,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: name => name,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Mô tả dự án</div>,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: description => description,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Thể loại</div>,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: category => category,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Ngày tạo</div>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: createdAt => moment(createdAt).format('DD/MM/YYYY'),
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
              backgroundColor: 'rgb(0,208,130)',
              borderColor: 'rgb(0,208,130)',
              padding: '6px 14px',
              boxShadow: 'rgb(0 208 130/ 24%) 0px 8px 16px 0px',
              height: '40px',
              borderRadius: '5px',
              color: '#fff',
              marginRight: '7px',
            }}
            onClick={() => onNavigate(id)}
          >
            <UnorderedListOutlined />
          </Button>
          { 
          isAdmin &&
            <>
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
                onClick={() => onEditProject(row)}
              >
                <EditOutlined />
              </Button>
              <Popconfirm
                placement="topLeft"
                title="Bạn có muốn xóa dự án này"
                onConfirm={() => onDeleteProject(id)}
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
            </>
          }
        </div>
      ),
    },
  ];

  const onNavigate = id => {
    history.push(`/projects/${id}`);
  };

  const onDeleteProject = async id => {
    setLoading(true);
    try {
      await projectActions.removeProject(id);
      await handleGetAllProject();
      message.info('Xóa dự án thành công');
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
    setLoading(false);
  };

  const onCreateProject = async value => {
    setLoading(true);
    try {
      await projectActions.createProject({
        name: value.name,
        description: value.description,
        category: value.category,
      });
      await handleGetAllProject();
      message.info('Tạo dự án thành công');
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
    setLoading(false);
  };

  const onEditProject = project => {
    setShowProjectUpdateModal(true);
    setProjectSelected(project);
  };

  const handleUpdateProject = async value => {
    setLoading(true);
    try {
      await projectActions.editProject(projectSelected.id, {
        name: value.name,
        description: value.description,
        category: value.category,
      });
      await handleGetAllProject();
      message.info('Cập nhật dự án thành công');
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
    setLoading(false);
  };

  return (
    <ProjectPage>
      {/* <ProjectNavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
      /> */}
      <ProjectSidebar />
      <ProjectsContainer>
        <StyledHeader
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>DỰ ÁN</h1>
          <Input
            placeholder="Tìm kiếm dự án"
            name="searchTerm"
            value={filter.searchTerm}
            onChange={handleFilter}
            style={{ width: '30%', borderRadius: '5px', padding: '10px 15px' }}
          />
          {isAdmin && (
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
                setShowProjectCreateModal(true);
              }}
            >
              Tạo dự án
            </Button>
          )}
        </StyledHeader>

        <Spin spinning={loading}>
          <Table
            onChange={handleTableChange}
            columns={columnsConfig}
            dataSource={projects.data}
            pagination={pagination}
            style={{
              margin: '10px 0 70px 0',
              paddingBottom: '50px',
            }}
          />
        </Spin>

        <ProjectCreateModal
          show={showProjectCreateModal}
          onCreate={onCreateProject}
          onHideModal={() => setShowProjectCreateModal(false)}
        />

        <ProjectUpdateModal
          projectSelected={projectSelected}
          show={showProjectUpdateModal}
          onCreate={handleUpdateProject}
          onHideModal={() => setShowProjectUpdateModal(false)}
        />
      </ProjectsContainer>
    </ProjectPage>
  );
};

export default Projects;
