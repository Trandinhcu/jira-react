import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, useRouteMatch,useHistory } from 'react-router-dom';
import { UserOutlined, TeamOutlined,LoginOutlined} from '@ant-design/icons';
import { Icon, ProjectAvatar } from 'shared/components';
import {
  LinkItem,
  LinkText,
  NotImplemented,
  ProjectInfo,
  ProjectName,
  ProjectTexts,
  Sidebar,
} from './Styles';

const ProjectSidebar = () => {
  const history = useHistory();
  const match = useRouteMatch();

  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>JIRA</ProjectName>
        </ProjectTexts>
      </ProjectInfo>

      <LinkItem {...{ as: NavLink, exact: true, to: '/projects' }}>
        <Icon type="board" />
        <LinkText>Dự án</LinkText>
      </LinkItem>

      <LinkItem {...{ as: NavLink, exact: true, to: '/users' }}>
        <TeamOutlined style={{ fontSize: '20px', marginRight: '15px' }} />
        <LinkText>Thành viên</LinkText>
      </LinkItem>

      <LinkItem {...{ as: NavLink, exact: true, to: '/profile' }}>
        <UserOutlined style={{ fontSize: '20px', marginRight: '15px' }} />
        <LinkText>Hồ sơ</LinkText>
      </LinkItem>

      <LinkItem onClick={handleLogout} >
        <LoginOutlined style={{ fontSize: '20px', marginRight: '15px' }} />
        <LinkText>Đăng xuất</LinkText>
      </LinkItem>

      {/* {renderLinkItem(match, 'Board', 'board', '/board')} */}
      {/* {renderLinkItem(match, 'Cài đặt', 'settings', '/settings')} */}
      {/* <Divider /> */}
      {/* {renderLinkItem(match, 'Releases', 'shipping')}
      {renderLinkItem(match, 'Issues and filters', 'issues')}
      {renderLinkItem(match, 'Pages', 'page')}
      {renderLinkItem(match, 'Reports', 'reports')}
      {renderLinkItem(match, 'Components', 'component')} */}
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${match.path}${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

export default ProjectSidebar;
