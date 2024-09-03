import Handlebars from 'handlebars';

export const toPascalCase = (str) => {
    return str
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .trim()
        .split(/[\s_-]+/)
        .map(word => {
            if (word === word.toUpperCase()) {
                return word;
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        })
        .filter(word => word)
        .join('');
}

export const toKebabCase = (str) => {
    return str
        .trim()
        .split(/[\s_-]+/)
        .map(word => word.toLowerCase())
        .filter(word => word)
        .join("-");
}

export const toCamelCase = (str) => {
    return str 
        .trim()
        .split(/[\s_-]+/)
        .map((word, index) => {
            if (index == 0) {
                return word.toLowerCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        })
        .join('');
}

// TODO
export const toFhirDataType = (dhis2ValueType) => {
    return "";
}

// TODO
export const toFhirCardinality = (dhis2Mandatory, repeatable) => {
    return "";
}

export const registerHelpers = () => {
    Handlebars.registerHelper('toPascalCase', function (str) {
        return toPascalCase(str);
    });

    Handlebars.registerHelper('toKebabCase', function (str) {
        return toKebabCase(str);
    });

    Handlebars.registerHelper('toCamelCase', function (str) {
        return toCamelCase(str);
    });

    Handlebars.registerHelper('toFhirDataType', function (str) {
        return toPascalCase(str);
    });

    Handlebars.registerHelper('toFhirCardinality', function (str) {
        return toPascalCase(str);
    });
};