import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IPatient } from "types";

const recoilSelectedPatient = atom<IPatient | null>({
  key: "recoilSelectedPatient",
  default: null,
});

export const useSelectedPatient = () => useRecoilState(recoilSelectedPatient);

export const useSelectedPatientValue = () =>
  useRecoilValue(recoilSelectedPatient);

export const useSetSelectedPatient = () =>
  useSetRecoilState(recoilSelectedPatient);
