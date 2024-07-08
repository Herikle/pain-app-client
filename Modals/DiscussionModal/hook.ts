import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { DiscussionModalProps } from ".";

type DiscussionModalPropsOmit = Omit<DiscussionModalProps, "onClose">;

const recoilDiscussionModal = atom<DiscussionModalPropsOmit | null>({
  key: "recoilDiscussionModal",
  default: null,
});

export const useDiscussionModalState = () =>
  useRecoilState(recoilDiscussionModal);

export const useDiscussionModalValue = () =>
  useRecoilValue(recoilDiscussionModal);

export const useSetDiscussionModal = () =>
  useSetRecoilState(recoilDiscussionModal);
