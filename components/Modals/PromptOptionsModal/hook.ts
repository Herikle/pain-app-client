import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IPromptOptions } from "types";
import { PromptOptionsModalChildProps } from ".";

const recoilPromptOptionsTypeSelectorModal = atom<Omit<
  PromptOptionsModalChildProps,
  "onClose"
> | null>({
  key: "recoilPromptOptionsTypeSelectorModal",
  default: null,
});

export const usePromptOptionsModalState = () =>
  useRecoilState(recoilPromptOptionsTypeSelectorModal);

export const usePromptOptionsModalValue = () =>
  useRecoilValue(recoilPromptOptionsTypeSelectorModal);

export const useSetPromptOptionsModal = () =>
  useSetRecoilState(recoilPromptOptionsTypeSelectorModal);
