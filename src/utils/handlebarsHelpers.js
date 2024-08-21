import Handlebars from 'handlebars';

export const convertToFhirName = (str) => {
    let cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '_');
    let capitalizedStr = cleanedStr
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    return capitalizedStr;
};

export const convertToFhirId = (str) => {
    let cleanedStr = str.trim();
    cleanedStr = cleanedStr.toLowerCase();
    cleanedStr = cleanedStr.replace(/[^a-zA-Z0-9]+/g, '-')
    cleanedStr = cleanedStr.replace(/^-+|-+$/g, '');
    return cleanedStr;
};

export const registerHelpers = () => {
    Handlebars.registerHelper('convertToFhirName', function (str) {
        return convertToFhirName(str);
    });

    Handlebars.registerHelper('convertToFhirId', function (str) {
        return convertToFhirId(str);
    });
};