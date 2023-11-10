import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ChildPropsChangeAccountInformationModal } from ".";

type Typing = Omit<ChildPropsChangeAccountInformationModal, "onClose">;

const recoilChangeAccountInformationModal = atom<Typing | null>({
  key: "recoilChangeAccountInformationModal",
  default: null,
});

export const useChangeAccountInformationModalState = () =>
  useRecoilState(recoilChangeAccountInformationModal);

export const useChangeAccountInformationModalValue = () =>
  useRecoilValue(recoilChangeAccountInformationModal);

export const useSetChangeAccountInformationModal = () =>
  useSetRecoilState(recoilChangeAccountInformationModal);
