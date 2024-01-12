import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChildPropsCreateEpisodeModal } from ".";

type Typing = Omit<ChildPropsCreateEpisodeModal, "onClose">;

const recoilCreateEpisodeModal = atom<Typing | null>({
  key: "recoilCreateEpisodeModal",
  default: null,
});

export const useCreateEpisodeModalState = () =>
  useRecoilState(recoilCreateEpisodeModal);

export const useCreateEpisodeModalValue = () =>
  useRecoilValue(recoilCreateEpisodeModal);

export const useSetCreateEpisodeModal = () =>
  useSetRecoilState(recoilCreateEpisodeModal);
