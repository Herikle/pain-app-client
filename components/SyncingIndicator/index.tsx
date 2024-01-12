import { TooltipContent } from "@components/TooltipContent";
import { IconsPath } from "@utils/icons";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type SyncingIndicatorProps = {
  isSyncing: boolean;
};

const svgString = `<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 9.28333C20 7.08333 18.2917 5.3 16.125 5.15C15.5583 2.275 13.0333 0.116667 10 0.116667C8.89167 0.116667 7.85833 0.416667 6.95833 0.925L8.2 2.16667C8.75833 1.925 9.35833 1.78333 10 1.78333C12.5333 1.78333 14.5833 3.83333 14.5833 6.36667V6.78333H15.8333C17.2167 6.78333 18.3333 7.9 18.3333 9.28333C18.3333 10.1083 17.9333 10.825 17.325 11.2833L18.5 12.4583C19.4083 11.6917 20 10.5667 20 9.28333ZM3.675 0L2.5 1.175L4.80833 3.48333H4.45833C1.95 3.75 0 5.875 0 8.45C0 11.2083 2.24167 13.45 5 13.45H14.775L16.4417 15.1167L17.6167 13.9417L3.675 0ZM5 11.7833C3.15833 11.7833 1.66667 10.2917 1.66667 8.45C1.66667 6.60833 3.15833 5.11667 5 5.11667H6.44167L13.1083 11.7833H5Z" fill="#949494"/>
</svg>
`;

const buff = Buffer.from(svgString);

const base64data = buff.toString("base64");

const unavaibleSrc = `data:image/svg+xml;base64,${base64data}`;

export const SyncingIndicator = ({ isSyncing }: SyncingIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const src = useMemo(() => {
    if (!isOnline) return unavaibleSrc;

    if (isSyncing) return IconsPath.Syncing;

    return IconsPath.Synced;
  }, [isOnline, isSyncing]);

  const alt = useMemo(() => {
    if (!isOnline) return "unavailable";

    if (isSyncing) return "syncing";

    return "synced";
  }, [isOnline, isSyncing]);

  const tooltip = useMemo(() => {
    if (!isOnline) return "No connection. Please check and retry.";

    if (isSyncing) return "Syncing data. Please wait a moment.";

    return "Data synced and saved successfully.";
  }, [isOnline, isSyncing]);

  return (
    <TooltipContent tooltip={tooltip}>
      {" "}
      <Image src={src} width={20} height={20} alt={alt} />
    </TooltipContent>
  );
};
