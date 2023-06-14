import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IPatient, IPrompt } from "types";

const recoilSelectedPrompt = atom<IPrompt | null>({
  key: "recoilSelectedPrompt",
  default: null,
});

export const useSelectedPrompt = () => useRecoilState(recoilSelectedPrompt);

export const useSelectedPromptValue = () =>
  useRecoilValue(recoilSelectedPrompt);

export const useSetSelectedPrompt = () =>
  useSetRecoilState(recoilSelectedPrompt);
