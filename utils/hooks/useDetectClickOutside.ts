import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

type Props = {
  element: HTMLElement | null | undefined;
  onClickOutSide: () => void;
  enabled?: boolean;
};

export const useDetectClickOutside = ({
  element,
  onClickOutSide,
  enabled = true,
}: Props) => {
  const debounceEnabled = useDebounce(enabled, 100);

  function handleClick(event) {
    const rect = element?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX;
    const y = event.clientY;

    if (
      !(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
    ) {
      onClickOutSide();
    }
  }

  useEffect(() => {
    if (debounceEnabled) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceEnabled, element]);
};
