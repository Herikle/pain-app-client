import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { TrackModalChildProps } from ".";

const recoilTrackModal = atom<Omit<TrackModalChildProps, "onClose"> | null>({
  key: "recoilTrackModal",
  default: null,
});

export const useTrackModalState = () => useRecoilState(recoilTrackModal);

export const useTrackModalValue = () => useRecoilValue(recoilTrackModal);

export const useSetTrackModal = () => useSetRecoilState(recoilTrackModal);
