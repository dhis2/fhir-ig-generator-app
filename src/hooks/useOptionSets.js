import { useDataQuery } from '@dhis2/app-runtime';

const optionSetsQuery = {
    optionSets: {
        resource: 'optionSets',
        params: {
            fields: ['id', 'name', 'displayName', 'description', 'created', 'lastUpdated', 'options[code,name,description]'],
            paging: false
        }
    }
};

export const useOptionSets = () => {
    const { data, error, loading } = useDataQuery(optionSetsQuery);
    return { data, error, loading };
};