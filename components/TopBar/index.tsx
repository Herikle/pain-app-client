import { useAuth } from "utils/hooks/useAuth";
import { useMatchMediaUp } from "@styles/media-query";
import { DesktopTopBar } from "./components/DesktopTopBar";
import { MobileTopBar } from "./components/MobileTopBar";

export const TopBar = () => {
  const { user } = useAuth();

  const isMobile = useMatchMediaUp("tablet");

  return isMobile ? (
    <MobileTopBar user={user} />
  ) : (
    <DesktopTopBar user={user} />
  );
};
