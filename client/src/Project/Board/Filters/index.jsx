import React from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';

import { Button } from 'antd';
import {
  Filters,
  SearchInput,
  Avatars,
  AvatarIsActiveBorder,
  StyledAvatar,
  StyledButton,
  ClearAll,
} from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({
  projectUsers,
  defaultFilters,
  filters,
  mergeFilters,
  issueCreateModalOpen,
}) => {
  const { searchTerm, userIds, myOnly, recent } = filters;

  return (
    <Filters data-testid="board-filters">
      <div style={{ display: 'flex' }}>
        <SearchInput
          icon="search"
          value={searchTerm}
          onChange={value => mergeFilters({ searchTerm: value })}
        />
        <Avatars>
          {projectUsers.map(user => (
            <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
              <StyledAvatar
                avatarUrl={user.avatarUrl}
                name={user.name}
                onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
              />
            </AvatarIsActiveBorder>
          ))}
        </Avatars>
      </div>

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
          issueCreateModalOpen();
        }}
      >
        Tạo
      </Button>
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
