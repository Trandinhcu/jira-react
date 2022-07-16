import { useSetRecoilState, useRecoilState } from 'recoil';
import { projectsAtom } from '../_states/project';
import { useHistory } from 'react-router-dom';
import api from 'shared/utils/api';

export { useProjectActions };

function useProjectActions() {
  const history = useHistory();
  const setProjects = useSetRecoilState(projectsAtom);

  return {
    getProject,
    getAllProject,
    createProject,
    editProject,
    removeProject,
  };

  function getAllProject(query) {
    return api.get(`/api/v1/projects`, query).then(data => {
      setProjects(data);
    });
  }

  function getProject(id) {
    return api.get(`/api/v1/projects/${id}`).then(({ data }) => {
      return data;
    });
  }

  function createProject(body) {
    return api
      .post(`/api/v1/projects`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function editProject(id, content) {
    return api
      .put(`/api/v1/projects/${id}`, content)
      .then(({ data }) => {
        // history.push('/projects');
      })
      .catch(error => console.log(error));
  }

  function removeProject(id) {
    return api.delete(`/api/v1/projects/${id}`);
  }
}
