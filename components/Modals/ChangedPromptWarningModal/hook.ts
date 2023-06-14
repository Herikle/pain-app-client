import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IPrompt } from "types";
import { ChildPropsChangedPromptWarningModal } from ".";

type Typing = Omit<ChildPropsChangedPromptWarningModal, "onClose">;

const recoilChangedPromptWarningModal = atom<Typing | null>({
  key: "recoilChangedPromptWarningModal",
  default: null,
});

export const useChangedPromptWarningModalState = () =>
  useRecoilState(recoilChangedPromptWarningModal);

export const useChangedPromptWarningModalValue = () =>
  useRecoilValue(recoilChangedPromptWarningModal);

export const useSetChangedPromptWarningModal = () =>
  useSetRecoilState(recoilChangedPromptWarningModal);
