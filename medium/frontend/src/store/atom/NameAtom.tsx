import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const NameAtom = atom({
    key:"NameAtom",
    default:"",
    effects_UNSTABLE: [persistAtom],
})