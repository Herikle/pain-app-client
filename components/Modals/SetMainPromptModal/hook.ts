import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IPromptOptions } from "types";
import { SetMainPromptChildProps } from ".";

const recoilSetMainPromptModal = atom<Omit<
  SetMainPromptChildProps,
  "onClose"
> | null>({
  key: "recoilSetMainPromptModal",
  default: null,
});

export const useSetMainPromptState = () =>
  useRecoilState(recoilSetMainPromptModal);

export const useSetMainPromptValue = () =>
  useRecoilValue(recoilSetMainPromptModal);

export const useSetSetMainPrompt = () =>
  useSetRecoilState(recoilSetMainPromptModal);
