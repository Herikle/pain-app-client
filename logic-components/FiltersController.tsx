import { useEffect } from "react";
import { useFiltersState, useFiltersValue } from "state/useFilters";

export const FiltersController = () => {
  const [filters, setFilters] = useFiltersState();

  const queryParamsToObject: any = () => {
    return window.location.search
      .slice(1)
      .split("&")
      .map((p) => p.split("="))
      .reduce((obj, pair) => {
        const [key, value] = pair.map(decodeURIComponent);
        if (key === "page") {
          let parsedValue = parseInt(value);

          obj[key] = parsedValue < 0 || parsedValue === 0 ? 0 : parsedValue - 1;
        } else {
          obj[key] = value;
        }
        return obj;
      }, {});
  };

  useEffect(() => {
    if (filters) {
      console.log(filters);
      const isNotEmpty = Object.keys(filters).length > 0;
      console.log(isNotEmpty);
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
