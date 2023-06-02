import { useSetWelcomeUserTypeSelectorModal } from "@components/Modals/WelcomeUserTypeSelectorModal/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "utils/hooks/useAuth";
import { ProtectedRoutesPath } from "utils/routes";

export const VerifyUser = () => {
  const { user } = useAuth();

  const { pathname } = useRouter();

  const openWelcomeModal = useSetWelcomeUserTypeSelectorModal();

  useEffect(() => {
    if (user) {
      if (ProtectedRoutesPath.includes(pathname)) {
        if (!user.role) {
          openWelcomeModal(true);
        } else {
          openWelcomeModal(false);
        }
      }
    }
  }, [user, openWelcomeModal, pathname]);

  return <></>;
};
