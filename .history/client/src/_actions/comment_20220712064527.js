import { useSetRecoilState, useRecoilState } from 'recoil';
import { commentsAtom } from '../_states/comment';
import { useHistory } from 'react-router-dom';
import api from 'shared/utils/api';

export { useCommentsActions };

function useCommentsActions() {
  const history = useHistory();
  const setComments = useSetRecoilState(commentsAtom);

  return {
    getIssue,
    getAllIssues,
    createIssue,
    updateIssue,
    removeIssue,
  };

  function getAllIssues() {
    return api.get(`/comments`).then(({ data }) => {
      return data;
    });
  }

  function getIssue(id) {
    return api.get(`/comments/${id}`).then(({ data }) => {
      return data;
    });
  }

  function createIssue(body) {
    return api
      .post(`/comments`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function updateIssue(id, body) {
    return api
      .put(`/comments/${id}`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function removeIssue(id) {
    return api.delete(`/comments/${id}`);
  }
}
