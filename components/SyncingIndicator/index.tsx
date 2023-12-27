import { IconsPath } from "@utils/icons";
import Image from "next/image";

type SyncingIndicatorProps = {
  isSyncing: boolean;
};

export const SyncingIndicator = ({ isSyncing }: SyncingIndicatorProps) => {
  if (isSyncing)
    return (
      <Image src={IconsPath.Syncing} width={20} height={20} alt="syncing" />
    );

  return <Image src={IconsPath.Synced} width={20} height={20} alt="synced" />;
};
