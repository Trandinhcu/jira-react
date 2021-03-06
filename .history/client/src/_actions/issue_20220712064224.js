import { useSetRecoilState, useRecoilState } from 'recoil';
import { issuesAtom } from '../_states/issue';
import { useHistory } from 'react-router-dom';
import api from 'shared/utils/api';

export { useIssuesActions };

function useIssuesActions() {
  const history = useHistory();
  const setIssues = useSetRecoilState(issuesAtom);

  return {
    getIssue,
    getAllIssues,
    createIssue,
    updateIssue,
    removeIssue,
  };

  function getAllIssues() {
    return api.get(`/issues`).then(({ data }) => {
      return data;
    });
  }

  function getIssue(id) {
    return api.get(`/api/v1/users/${id}`).then(({ data }) => {
      return data;
    });
  }

  function createIssue(body) {
    return api
      .post(`/api/v1/users`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function updateIssue(id, body) {
    return api
      .put(`/api/v1/users/${id}`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function removeIssue(id) {
    return api.delete(`/api/v1/users/${id}`);
  }
}
