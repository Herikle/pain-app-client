import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { AttributesConfigModalChildProps } from ".";

const recoilAttributesConfigModal = atom<Omit<
  AttributesConfigModalChildProps,
  "onClose"
> | null>({
  key: "recoilAttributesConfigModal",
  default: null,
});

export const useAttributesConfigModalState = () =>
  useRecoilState(recoilAttributesConfigModal);

export const useAttributesConfigModalValue = () =>
  useRecoilValue(recoilAttributesConfigModal);

export const useSetAttributesConfigModal = () =>
  useSetRecoilState(recoilAttributesConfigModal);
