import { useSetRecoilState } from 'recoil';
import api from 'shared/utils/api';

import { usersAtom } from '../_states/user';
import { useHistory } from 'react-router-dom';

export { useUserActions };
function useUserActions() {
  const history = useHistory();
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
  };

  function login(body) {
    return api.post(`/authentication`, body).then(({ authToken, user }) => {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = "/projects";
    });
  }

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // setProfile(null);
    history.push('/login');
  }
}
