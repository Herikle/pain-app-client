import { useDeletePatientModalState } from "./hook";
import Router from "next/router";
import { RoutesPath } from "@utils/routes";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { useDeletePatient } from "@queries/patient/usePatient";
import { IPatient } from "types";
import { useSetSelectedPatient } from "state/useSelectedPatient";

export type DeletePatientModalProps = {
  onClose: () => void;
  patient: IPatient;
  patient_id: string;
};

const Child = ({ onClose, patient_id, patient }: DeletePatientModalProps) => {
  const deletePatient = useDeletePatient();

  const setSelectedPatient = useSetSelectedPatient();

  const onConfirm = async () => {
    await deletePatient.mutateAsync({
      params: {
        patient_id,
      },
    });
    onClose();
    setSelectedPatient(null);
    Router.replace(RoutesPath.profile);
  };

  return (
    <ConfirmActionModal
      data-cy="delete-patient-modal"
      onClose={onClose}
      onConfirm={onConfirm}
      title={
        <>
          Are you sure to delete <strong>{patient.name}</strong>?
        </>
      }
      description="Once you delete this patient, all episodes will be deleted too."
      confirmText="Yes, delete it"
      loading={deletePatient.isLoading}
      writeConfirmation={{
        label: (
          <>
            Type the <strong>first name</strong> of the patient to confirm
          </>
        ),
        testText: patient.name.split(" ")[0],
      }}
    />
  );
};

export const DeletePatientModal = () => {
  const [isOpen, setIsOpen] = useDeletePatientModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
