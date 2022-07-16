import { atom } from 'recoil';

const commentsAtom = atom({
    key: 'comments',
    default: {
        loaded: false,
        items: []
    }
});

export {
    commentsAtom,
};