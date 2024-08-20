import Handlebars from 'handlebars';

export const registerHelpers = () => {
    Handlebars.registerHelper('convertToFhirName', function (str) {
        str.replace(/[()]/g, '_')
            .replace(/\s+/g, '')
            .replace(/(?:^|\s)(\w)/g, (_, c) => c ? c.toUpperCase() : '');
        return str;
    });
};