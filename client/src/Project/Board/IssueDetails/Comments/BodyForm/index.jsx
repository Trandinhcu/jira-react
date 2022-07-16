import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';

import { Textarea } from 'shared/components';

import { Actions, FormButton } from './Styles';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isWorking: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsBodyForm = ({
  value,
  onChange,
  isWorking,
  onSubmit,
  onCancel,
}) => {
  const $textareaRef = useRef();

  const handleSubmit = () => {
    if ($textareaRef.current.value.trim()) {
      onSubmit();
    }
  };

  return (
    <Fragment>
      <Textarea
        autoFocus
        placeholder="Thêm bình luận..."
        value={value}
        onChange={onChange}
        ref={$textareaRef}
      />
      <Actions>
        <FormButton variant="primary" isWorking={isWorking} onClick={handleSubmit}>
          Lưu
        </FormButton>
        <FormButton variant="empty" onClick={onCancel}>
          Hủy
        </FormButton>
      </Actions>
    </Fragment>
  );
};

ProjectBoardIssueDetailsCommentsBodyForm.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsBodyForm;
