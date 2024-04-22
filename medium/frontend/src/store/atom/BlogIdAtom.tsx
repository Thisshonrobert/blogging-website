import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const BlogIdAtom =atom({
  key: 'BlogIdAtom',
  default: "",
  effects_UNSTABLE: [persistAtom],
})