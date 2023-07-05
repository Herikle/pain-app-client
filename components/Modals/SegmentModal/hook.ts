import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { SegmentModalChildProps } from ".";

const recoilSegmentModal = atom<Omit<SegmentModalChildProps, "onClose"> | null>(
  {
    key: "recoilSegmentModal",
    default: null,
  }
);

export const useSegmentModalState = () => useRecoilState(recoilSegmentModal);

export const useSegmentModalValue = () => useRecoilValue(recoilSegmentModal);

export const useSetSegmentModal = () => useSetRecoilState(recoilSegmentModal);
