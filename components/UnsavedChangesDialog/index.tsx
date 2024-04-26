import { ConfirmActionModal } from "@Modals/ConfirmActionModal";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export interface UnsavedChangesDialogProps {
  shouldConfirmLeave: boolean;
  pathnamesToIgnore?: string[];
}

export const UnsavedChangesDialog = ({
  shouldConfirmLeave,
  pathnamesToIgnore,
}: UnsavedChangesDialogProps): React.ReactElement<UnsavedChangesDialogProps> => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    React.useState(false);
  const [nextRouterPath, setNextRouterPath] = React.useState<string | null>(
    null
  );

  const Router = useRouter();
  const pathname = usePathname();
  const onRouteChangeStart = React.useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) {
        return;
      }
      if (pathname !== nextPath) {
        if (pathnamesToIgnore?.includes(nextPath)) {
          return;
        }

        setShouldShowLeaveConfirmDialog(true);
        setNextRouterPath(nextPath);
        throw "cancelRouteChange";
      }
    },
    [pathname, shouldConfirmLeave, pathnamesToIgnore]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(null);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);

    removeListener();
    if (!nextRouterPath) return;

    Router.push(nextRouterPath);
  };

  const removeListener = useCallback(() => {
    Router.events.off("routeChangeStart", onRouteChangeStart);
  }, [Router.events, onRouteChangeStart]);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChangeStart);

    return removeListener;
  }, [Router.events, onRouteChangeStart, removeListener]);

  return shouldShowLeaveConfirmDialog ? (
    <ConfirmActionModal
      title="You have unsaved changes"
      description="Leaving this page will discard unsaved changes. Are you sure?"
      confirmText="Yes, I want to exit"
      onConfirm={onConfirmRouteChange}
      onCancel={onRejectRouteChange}
      onClose={onRejectRouteChange}
    />
  ) : (
    <></>
  );
};
