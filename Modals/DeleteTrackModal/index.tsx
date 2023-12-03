import { useDeleteTrack } from "@queries/track/useTrack";
import { ConfirmActionModal } from "Modals/ConfirmActionModal";
import { useState } from "react";
import { ITrack } from "types";

type DeleteTrackModalProps = {
  track: ITrack;
  onClose: () => void;
};

export const DeleteTracKModal = ({ track, onClose }: DeleteTrackModalProps) => {
  const closeConfirmDelete = () => {
    onClose();
  };

  const deleteTrack = useDeleteTrack();

  const onDelete = async () => {
    await deleteTrack.mutateAsync({
      params: {
        track_id: track._id,
      },
    });
    onClose();
  };

  return (
    <ConfirmActionModal
      onClose={closeConfirmDelete}
      title="Are you sure you want to delete this track?"
      description="All segments will be lost. This action cannot be undone."
      confirmText="Yes, delete it"
      writeConfirmation={{
        label: (
          <>
            To delete this track, type the track name{" "}
            <strong>{track.name}</strong>
          </>
        ),
        testText: track.name,
      }}
      onConfirm={onDelete}
      loading={deleteTrack.isLoading}
    />
  );
};
