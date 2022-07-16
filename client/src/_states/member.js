import { atom } from 'recoil';

const membersAtom = atom({
  key: 'members',
  default: [],
});

export { membersAtom };
