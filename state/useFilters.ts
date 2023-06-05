import { atom, useRecoilState, useRecoilValue } from "recoil";

const recoilFilters = atom<any>({
  key: "recoilFilters",
  default: {},
});

export const useFiltersState = () => useRecoilState(recoilFilters);

export const useFiltersValue = () => useRecoilValue(recoilFilters);

export const useFilters = () => {
  const [filters, setFilters] = useFiltersState();

  const apply = (key: string, value: any) => {
    if (!value) {
      const { [key]: _, ...newFilters } = filters;
      setFilters(newFilters);
    } else {
      setFilters((filters) => ({
        ...filters,
        [key]: value,
      }));
    }
  };

  const reset = () => {
    setFilters({});
  };

  return {
    filters,
    apply,
    reset,
  };
};
