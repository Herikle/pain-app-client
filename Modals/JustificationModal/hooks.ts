import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { JustificationModalProps } from ".";

const recoilJustificaitonModalModal = atom<Omit<
  JustificationModalProps,
  "onClose"
> | null>({
  key: "recoilJustificaitonModal",
  default: null,
});

export const useJustificationModalState = () =>
  useRecoilState(recoilJustificaitonModalModal);

export const useJustificationModalValue = () =>
  useRecoilValue(recoilJustificaitonModalModal);

export const useSetJustificationModal = () =>
  useSetRecoilState(recoilJustificaitonModalModal);
