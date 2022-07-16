import { useSetRecoilState } from 'recoil';
import api from 'shared/utils/api';

import { issuessAtom } from '../_states/user';
import { useHistory } from 'react-router-dom';

export { useUserActions };
function useUserActions() {
  const history = useHistory();
  const setUsers = useSetRecoilState(issuessAtom);

  return {
    login,
    logout,
  };

  function login(body) {
    return api.post(`/authentication`, body).then(({ authToken, user }) => {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/projects');
    });
  }

  function logout() {
    localStorage.removeItem('authToken');
    setProfile(null);
    history.push('/login');
  }
}
