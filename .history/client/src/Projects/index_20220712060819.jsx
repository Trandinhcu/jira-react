import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, Input, message } from 'antd';
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

const Projects = () => {
  const projectActions = useProjectActions();
  const [projects] = useRecoilState(projectsAtom);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [filter, setFilter] = useState({});

  const handleGetAllProject = useCallback(async () => {
    try {
      await projectActions.getAllProject({ ...pagination, ...filter });
    } catch (e) {
      message.error(e.message);
    }
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
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>T??n d??? ??n</div>,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: name => name,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>M?? t??? d??? ??n</div>,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: description => description,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Th??? lo???i</div>,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      render: category => category,
    },
    {
      title: <div style={{ fontSize: '14px', fontWeight: '700', color: '#777' }}>Ng??y t???o</div>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: createdAt => moment(createdAt).format('DD/MM/YYYY'),
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
            title="B???n c?? mu???n x??a d??? ??n n??y"
            onConfirm={() => onDeleteProject(id)}
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

  const onNavigate = id => {
    history.push(`/projects/${id}`);
  };

  const onDeleteProject = async id => {
    try {
      await projectActions.removeProject(id);
      handleGetAllProject();
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
  };

  const onCreateProject = async value => {
    try {
      await projectActions.createProject({
        name: value.name,
        description: value.description,
        category: value.category,
      });
      handleGetAllProject();
    } catch ({ response }) {
      const { data } = response;
      message.error(data.message);
    }
  };

  const onEditProject = project => {
    setShowProjectUpdateModal(true);
    setProjectSelected(project);
  };

  const handleUpdateProject = value => {
    console.log('value: ', value);
    // try {
    //   await projectActions.createProject({
    //     name: value.name,
    //     description: value.description,
    //     category: value.category,
    //   });
    //   handleGetAllProject();
    // } catch ({ response }) {
    //   const { data } = response;
    //   message.error(data.message);
    // }
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
          <h1>D??? ??N</h1>
          <Input
            placeholder="T??m ki???m"
            name="searchTerm"
            value={filter.searchTerm}
            onChange={handleFilter}
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
              setShowProjectCreateModal(true);
            }}
          >
            T???o d??? ??n
          </Button>
        </StyledHeader>

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
