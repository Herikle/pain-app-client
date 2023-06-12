import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFiltersState, useFiltersValue } from "state/useFilters";

export const FiltersController = () => {
  const [filters, setFilters] = useFiltersState();

  const { pathname } = useRouter();

  const queryParamsToObject: any = () => {
    const searchString = window.location.search;

    const query = new URLSearchParams(searchString);

    const obj = Object.fromEntries(query.entries());
    return obj;
  };

  useEffect(() => {
    setFilters({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const obj = queryParamsToObject();
    setFilters(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filters) {
      const isNotEmpty = Object.keys(filters).length > 0;
      if (isNotEmpty) {
        const query = new URLSearchParams();
        Object.keys(filters)?.forEach((filterKey) => {
          query.set(filterKey, filters[filterKey]?.toString());
        });

        let novaUrl = "";
        if (query.toString()) {
          novaUrl = `${location.pathname}?${query.toString()}`;
        } else {
          novaUrl = `${location.pathname}`;
        }
        window.history.replaceState(null, "", novaUrl);
      }
    }
  }, [filters]);

  return <></>;
};
