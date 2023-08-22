import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const recoilWelcomeUserTypeSelectorModal = atom({
  key: "recoilWelcomeUserTypeSelectorModal",
  default: false,
});

export const useWelcomeUserTypeSelectorModal = () =>
  useRecoilState(recoilWelcomeUserTypeSelectorModal);

export const useWelcomeUserTypeSelectorModalValue = () =>
  useRecoilValue(recoilWelcomeUserTypeSelectorModal);

export const useSetWelcomeUserTypeSelectorModal = () =>
  useSetRecoilState(recoilWelcomeUserTypeSelectorModal);
