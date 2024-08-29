import { useDataQuery } from "@dhis2/app-runtime";

const trackerProgramQuery = {
  programs: {
    resource: "programs",
    params: {
      filter: "programType:eq:WITH_REGISTRATION",
      fields: ["id", "displayName"],
      paging: false,
    },
  },
};

export const useTrackerPrograms = () => {
  const { data, error, loading } = useDataQuery(trackerProgramQuery);
  const programs = data?.programs?.programs ?? [];
  return { programs, error, loading };
};