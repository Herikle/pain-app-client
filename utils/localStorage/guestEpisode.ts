const tokenKey = "_paintrack_guest_episode";

export const getGuestEpisodeId = () => {
  return localStorage.getItem(tokenKey);
};

export const hasGuestEpisode = () => {
  return !!getGuestEpisodeId();
};

export const storeGuestEpisodeId = (episode_id: string) => {
  localStorage.setItem(tokenKey, episode_id);
};

export const clearGuestEpisode = () => {
  localStorage.removeItem(tokenKey);
};
