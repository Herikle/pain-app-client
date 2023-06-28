import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { DeletePromptModalProps } from ".";

type DeletePromptModalPropsOmit = Omit<DeletePromptModalProps, "onClose">;

const recoilDeleteModal = atom<DeletePromptModalPropsOmit | null>({
  key: "recoilDeleteModal",
  default: null,
});

export const useDeletePromptModalState = () =>
  useRecoilState(recoilDeleteModal);

export const useDeletePromptModalValue = () =>
  useRecoilValue(recoilDeleteModal);

export const useSetDeletePromptModal = () =>
  useSetRecoilState(recoilDeleteModal);
