import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { DeletePatientModalProps } from ".";

type DeletePatientModalPropsOmit = Omit<DeletePatientModalProps, "onClose">;

const recoilDeletePatient = atom<DeletePatientModalPropsOmit | null>({
  key: "recoilDeletePatient",
  default: null,
});

export const useDeletePatientModalState = () =>
  useRecoilState(recoilDeletePatient);

export const useDeletePatientModalValue = () =>
  useRecoilValue(recoilDeletePatient);

export const useSetDeletePatientModal = () =>
  useSetRecoilState(recoilDeletePatient);
