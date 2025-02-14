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
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .filter((word) => word)
    .join("-");
};

export const toCamelCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      if (index == 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
};

export const toFhirDataElementName = (dhis2Object) => {
  if (!dhis2Object.name) {
    throw new Error("Element must have a name property.");
  }

  const maxLength = 64;
  const name = dhis2Object.shortName || dhis2Object.name;
  const fhirDataElementName = toCamelCase(name);

  if (fhirDataElementName.length > maxLength) {
    throw new Error("The chosen name is too long to be a valid FHIR data element name.")
  }

  return fhirDataElementName;
};

export const toQuestionnaireItemType = (dhis2ValueType) => {
  switch (dhis2ValueType) {
    case "TEXT":
    case "LONG_TEXT":
    case "EMAIL":
    case "PHONE_NUMBER":
    case "LETTER":
      return "string";

    case "INTEGER":
    case "INTEGER_POSITIVE":
    case "INTEGER_NEGATIVE":
    case "INTEGER_ZERO_OR_POSITIVE":
      return "integer";

    case "NUMBER":
    case "PERCENTAGE":
    case "UNIT_INTERVAL":
      return "decimal";

    case "BOOLEAN":
    case "TRUE_ONLY":
      return "boolean";

    case "FILE_RESOURCE":
    case "IMAGE":
      return "attachment";

    case "DATE":
      return "date";

    case "DATETIME":
      return "dateTime";

    case "TIME":
      return "time";

    case "URL":
      return "url";

    default:
      return "string";
  }
}

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
    case "PERCENTAGE":
    case "UNIT_INTERVAL":
      return "decimal";

    case "BOOLEAN":
    case "TRUE_ONLY":
      return "boolean";

    case "FILE_RESOURCE":
    case "IMAGE":
      return "Attachment";

    case "INTEGER":
      return "integer";

    case "INTEGER_POSITIVE":
      return "positiveInt";

    case "INTEGER_NEGATIVE":
      return "integer";

    case "INTEGER_ZERO_OR_POSITIVE":
      return "unsignedInt";

    case "DATE":
      return "date";

    case "DATETIME":
      return "dateTime";

    case "TIME":
      return "time";

    case "URL":
      return "url";

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

export const extractOptionSetNames = (programStage) => {
  const optionSets = new Set();
  programStage.programStageDataElements.forEach((psde) => {
    if (psde.dataElement?.optionSet?.name) {
      optionSets.add(psde.dataElement.optionSet.name);
    }
  });
  return Array.from(optionSets);
};

export const registerHelpers = () => {

  Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

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
    "toQuestionnaireItemType",
    function (dhis2ValueType) {
      return toQuestionnaireItemType(dhis2ValueType);
    }
  );

  Handlebars.registerHelper(
    "toFhirDataType",
    function (dhis2ValueType, isOptionSet) {
      return toFhirDataType(dhis2ValueType, isOptionSet);
    }
  );

  Handlebars.registerHelper("toFhirCardinality", function (isMandatory) {
    return toFhirCardinality(isMandatory);
  });

  Handlebars.registerHelper("toFhirElementDescription", function (str) {
    return toFhirElementDescription(str);
  });

  Handlebars.registerHelper("isRepeatable", function (repeatable) {
    return isRepeatable(repeatable);
  });

  Handlebars.registerHelper("toFhirDataElementName", function (dhis2Object) {
    return toFhirDataElementName(dhis2Object);
  });

  Handlebars.registerHelper("extractOptionSetNames", function (programStage, options) {
    return extractOptionSetNames(programStage);
  });
};
