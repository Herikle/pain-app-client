import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChildPropsChangePasswordModal } from ".";

type Typing = Omit<ChildPropsChangePasswordModal, "onClose">;

const recoilChangePasswordModal = atom<Typing | null>({
  key: "recoilChangePasswordModal",
  default: null,
});

export const useChangePasswordModalState = () =>
  useRecoilState(recoilChangePasswordModal);

export const useChangePasswordModalValue = () =>
  useRecoilValue(recoilChangePasswordModal);

export const useSetChangePasswordModal = () =>
  useSetRecoilState(recoilChangePasswordModal);
