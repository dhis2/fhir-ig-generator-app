/*
The code validation is based on the dhis2 naming conventions
https://docs.dhis2.org/en/implement/health/dhis2-health-data-toolkit/naming-conventions.html
*/
export const validateCodes = (optionSets) => {
    const invalidCodes = optionSets.filter(optionSet => 
        optionSet.options.some(option => 
            !/^[A-Z0-9_]+$/.test(option.code) || 
            !/[A-Z0-9_]/.test(option.code)
        )
    );
    return invalidCodes.length > 0;
};