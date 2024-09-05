import Handlebars from "handlebars";

export const toPascalCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9\s.-]/g, " ")
    .trim()
    .split(/[\s_-]+/)
    .map((word) => {
      if (word === word.toUpperCase()) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .filter((word) => word)
    .join("");
};

export const toKebabCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9\s.-]/g, " ")
    .trim()
    .split(/[\s_-]+/)
    .map((word) => word.toLowerCase())
    .filter((word) => word)
    .join("-");
};

export const toCamelCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9\s.-]/g, " ")
    .trim()
    .split(/[\s_-]+/)
    .map((word, index) => {
      if (index == 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};

// TODO
export const toFhirDataType = (dhis2ValueType, isOptionSet = false) => {
  if (isOptionSet) {
    return "code";
  }
  switch (dhis2ValueType) {
    case "TEXT":
    case "LONG_TEXT":
    case "EMAIL":
    case "PHONE_NUMBER":
      return "string";
    case "NUMBER":
      return "decimal";
    case "INTEGER":
      return "integer";
    case "INTEGER_POSITIVE":
      return "positiveInt";
    case "INTEGER_NEGATIVE":
      return "negativeInt";
    case "INTEGER_ZERO_OR_POSITIVE":
      return "unsignedInt";
    case "PERCENTAGE":
      return "decimal";
    case "UNIT_INTERVAL":
      return "decimal";
    case "DATE":
      return "date";
    case "DATETIME":
      return "dateTime";
    case "TIME":
      return "time";
    case "BOOLEAN":
      return "boolean";
    case "TRUE_ONLY":
      return "boolean";
    case "URL":
      return "url";
    case "FILE_RESOURCE":
    case "IMAGE":
      return "Attachment";
    case "AGE":
      return "Age";
    default:
      return "string";
  }
};

export const toFhirCardinality = (isMandatory) => {
  return isMandatory ? "1" : "0";
};

export const toFhirElementDescription = (dhis2ProgramAttribute) => {
  if (dhis2ProgramAttribute.description) {
    return dhis2ProgramAttribute.description;
  } else {
    return dhis2ProgramAttribute.name;
  }
};

export const isRepeatable = (repeatable) => {
  return repeatable ? "*" : "1";
};

export const registerHelpers = () => {
  Handlebars.registerHelper("toPascalCase", function (str) {
    return toPascalCase(str);
  });

  Handlebars.registerHelper("toKebabCase", function (str) {
    return toKebabCase(str);
  });

  Handlebars.registerHelper("toCamelCase", function (str) {
    return toCamelCase(str);
  });

  Handlebars.registerHelper(
    "toFhirDataType",
    function (dhis2ValueType, isOptionSet) {
      return toFhirDataType(dhis2ValueType, isOptionSet);
    }
  );

  Handlebars.registerHelper(
    "toFhirCardinality",
    function (isMandatory) {
      return toFhirCardinality(isMandatory);
    }
  );

  Handlebars.registerHelper("toFhirElementDescription", function (str) {
    return toFhirElementDescription(str);
  });

  Handlebars.registerHelper("isRepeatable", function (repeatable) {
    return isRepeatable(repeatable);
  });
};
