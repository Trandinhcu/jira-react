import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from 'shared/utils/dateTime';

import { Dates } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue }) => (
  <Dates>
    <div>Được tạo lúc {formatDateTimeConversational(issue.createdAt)}</div>
    <div>Được chỉnh sửa lúc {formatDateTimeConversational(issue.updatedAt)}</div>
  </Dates>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
