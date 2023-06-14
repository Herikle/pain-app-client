import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

type DeletePromptModalProps = {
  prompt_id: string;
};

const recoilDeleteModal = atom<DeletePromptModalProps | null>({
  key: "recoilDeleteModal",
  default: null,
});

export const useDeletePromptModalState = () =>
  useRecoilState(recoilDeleteModal);

export const useDeletePromptModalValue = () =>
  useRecoilValue(recoilDeleteModal);

export const useSetDeletePromptModal = () =>
  useSetRecoilState(recoilDeleteModal);
