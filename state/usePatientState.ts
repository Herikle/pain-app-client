import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { memoize } from "lodash";
import { IPatient } from "types";

type PatientState = {
  name?: string;
  type?: IPatient["type"];
};

const recoilPatientState = memoize((patient_id: string) =>
  atom<PatientState | null>({
    key: `recoilPatientState-${patient_id}`,
    default: null,
  })
);

export const usePatientState = (patient_id: string) =>
  useRecoilState(recoilPatientState(patient_id));

export const usePatientStateValue = (patient_id: string) =>
  useRecoilValue(recoilPatientState(patient_id));

export const useSetPatientState = (patient_id: string) =>
  useSetRecoilState(recoilPatientState(patient_id));
