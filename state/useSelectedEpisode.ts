import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { IEpisode } from "types";

const recoilSelectedEpisode = atom<IEpisode | null>({
  key: "recoilSelectedEpisode",
  default: null,
});

export const useSelectedEpisode = () => useRecoilState(recoilSelectedEpisode);

export const useSelectedEpisodeValue = () =>
  useRecoilValue(recoilSelectedEpisode);

export const useSetSelectedEpisode = () =>
  useSetRecoilState(recoilSelectedEpisode);
