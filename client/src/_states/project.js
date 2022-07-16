import { atom } from 'recoil';

const projectsAtom = atom({
  key: 'projects',
  default: [],
});

export { projectsAtom };
