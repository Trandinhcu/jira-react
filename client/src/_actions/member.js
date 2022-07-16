import { useSetRecoilState, useRecoilState } from 'recoil';
import { membersAtom } from '../_states/member';
import { useHistory } from 'react-router-dom';
import api from 'shared/utils/api';

export { useMembersActions };

function useMembersActions() {
  const history = useHistory();
  const setMembers = useSetRecoilState(membersAtom);

  return {
    getMember,
    getAllMembers,
    createMember,
    editMember,
    removeMember,
  };

  function getAllMembers(query) {
    return api.get(`/api/v1/users`, query).then(data => {
      setMembers(data);
    });
  }

  function getMember(id) {
    return api.get(`/api/v1/users/${id}`).then(({ data }) => {
      return data;
    });
  }

  function createMember(body) {
    return api
      .post(`/api/v1/users`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function editMember(id, body) {
    return api
      .put(`/api/v1/users/${id}`, body)
      .then(({ data }) => {})
      .catch(error => console.log(error));
  }

  function removeMember(id) {
    return api.delete(`/api/v1/users/${id}`);
  }
}
