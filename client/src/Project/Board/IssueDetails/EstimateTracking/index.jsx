import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import { InputDebounced, Modal, Button } from 'shared/components';

import TrackingWidget from './TrackingWidget';
import { SectionTitle } from '../Styles';
import {
  TrackingLink,
  ModalContents,
  ModalTitle,
  Inputs,
  InputCont,
  InputLabel,
  Actions,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsEstimateTracking = ({ issue, updateIssue }) => (
  <Fragment>
    <SectionTitle>Thời gian ước tính (giờ)</SectionTitle>
    {renderHourInput('estimate', issue, updateIssue)}

    <SectionTitle>Thời gian còn lại</SectionTitle>
    <Modal
      testid="modal:tracking"
      width={400}
      renderLink={modal => (
        <TrackingLink onClick={modal.open}>
          <TrackingWidget issue={issue} />
        </TrackingLink>
      )}
      renderContent={modal => (
        <ModalContents>
          <ModalTitle>Thời gian còn lại</ModalTitle>
          <TrackingWidget issue={issue} />
          <Inputs>
            <InputCont>
              <InputLabel>Thời gian đã làm (giờ)</InputLabel>
              {renderHourInput('timeSpent', issue, updateIssue)}
            </InputCont>
            <InputCont>
              <InputLabel>Thời gian còn lại (giờ)</InputLabel>
              {renderHourInput('timeRemaining', issue, updateIssue)}
            </InputCont>
          </Inputs>
          <Actions>
            <Button variant="primary" onClick={modal.close}>
              Hoàn thành
            </Button>
          </Actions>
        </ModalContents>
      )}
    />
  </Fragment>
);

const renderHourInput = (fieldName, issue, updateIssue) => (
  <InputDebounced
    placeholder="Number"
    filter={/^\d{0,6}$/}
    value={isNil(issue[fieldName]) ? '' : issue[fieldName]}
    onChange={stringValue => {
      const value = stringValue.trim() ? Number(stringValue) : null;
      updateIssue({ [fieldName]: value });
    }}
  />
);

ProjectBoardIssueDetailsEstimateTracking.propTypes = propTypes;

export default ProjectBoardIssueDetailsEstimateTracking;
