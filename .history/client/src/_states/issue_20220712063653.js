import { atom } from 'recoil';

const issuesAtom = atom({
  key: 'issues',
  default: {
    loaded: false,
    items: [],
  },
});

export { issuesAtom };
