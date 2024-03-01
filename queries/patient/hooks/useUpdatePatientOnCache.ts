import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { IEpisode, IPatient } from "types";
import update from "immutability-helper";
import { GetPatientByIdResponse, GetPatientsResponse } from "../useGetPatients";

type DeletePatientOnCache = {
  id: string;
};

export const useUpdatePatientOnCache = () => {
  const queryClient = useQueryClient();

  const deletePatientOnCache = async (values: DeletePatientOnCache) => {
    const { id } = values;

    queryClient.setQueriesData(
      [QueryKeys.Patients.List],
      (old: GetPatientsResponse) => {
        const patientIndex = old.results.findIndex(
          (episode: IPatient) => episode._id === id
        );
        if (patientIndex > -1) {
          const newResults = update(old, {
            results: {
              $splice: [[patientIndex, 1]],
            },
          });

          return newResults;
        }

        return old;
      }
    );
  };

  return { deletePatientOnCache };
};
