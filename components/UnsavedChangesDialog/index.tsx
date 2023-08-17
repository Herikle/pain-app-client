import { ConfirmActionModal } from "@components/Modals/ConfirmActionModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export interface UnsavedChangesDialogProps {
  shouldConfirmLeave: boolean;
}

export const UnsavedChangesDialog = ({
  shouldConfirmLeave,
}: UnsavedChangesDialogProps): React.ReactElement<UnsavedChangesDialogProps> => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    React.useState(false);
  const [nextRouterPath, setNextRouterPath] = React.useState<string | null>(
    null
  );

  const Router = useRouter();

  const onRouteChangeStart = React.useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) {
        return;
      }

      setShouldShowLeaveConfirmDialog(true);
      setNextRouterPath(nextPath);

      throw "cancelRouteChange";
    },
    [shouldConfirmLeave]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(null);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
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
      onConfirm={onConfirmRouteChange}
      onCancel={onRejectRouteChange}
      onClose={onRejectRouteChange}
    />
  ) : (
    <></>
  );
};
