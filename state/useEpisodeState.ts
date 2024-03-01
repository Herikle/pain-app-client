import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { memoize } from "lodash";

type EpisodeState = {
  name?: string;
};

const recoilEpisodeState = memoize((episode_id: string) =>
  atom<EpisodeState | null>({
    key: `recoilEpisodeState-${episode_id}`,
    default: null,
  })
);

export const useEpisodeState = (episode_id: string) =>
  useRecoilState(recoilEpisodeState(episode_id));

export const useEpisodeStateValue = (episode_id: string) =>
  useRecoilValue(recoilEpisodeState(episode_id));

export const useSetEpisodeState = (episode_id: string) =>
  useSetRecoilState(recoilEpisodeState(episode_id));
