import { useDataQuery } from "@dhis2/app-runtime";

const trackerProgramQuery = {
  programs: {
    resource: "programs",
    params: {
      filter: "programType:eq:WITH_REGISTRATION",
      fields: [
        "id",
        "displayName",
        "name",
        "description",
        "enrollmentDateLabel",
        "incidentDateLabel",
        "programTrackedEntityAttributes[mandatory,trackedEntityAttribute[id,name,shortName,formName,displayName,valueType,description,optionSet[name,valueType,options[code,name]]]]",
        "programStages[name,description,repeatable,programStageSections[name,description,displayFormName,dataElements[id]],programStageDataElements[compulsory,dataElement[id,name,shortName,formName,displayName,valueType,optionSet[name,options[code,name]]]]]",
      ]
    },
  },
};

export const useTrackerPrograms = () => {
  const { data, error, loading } = useDataQuery(trackerProgramQuery);

  const programs = data?.programs?.programs ?? [];

  return {
    programs,
    error,
    loading,
  };
};
