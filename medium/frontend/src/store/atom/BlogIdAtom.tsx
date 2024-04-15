import { atom } from 'recoil';

export const BlogIdAtom = atom({
  key: 'BlogIdAtom',
  default: localStorage.getItem('blogId') || "",
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('blogId', newValue);
      });
    },
  ],
});
