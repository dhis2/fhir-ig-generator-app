import { isMandatory, toCamelCase, toFhirCardinality, toFhirDataType, toKebabCase, toPascalCase } from "../utils/handlebarsHelpers";

test('converts a string to pascal case', () => {
    expect(toPascalCase("THIs Is my test   name__ ")).toBe("ThisIsMyTestName");
});

test('converts a string to pascal case, with upper-case abbrevations and acronyms', () => {
    expect(toPascalCase("TB Program")).toBe("TBProgram");
});

test('converts a string to kebab case', () => {
    expect(toKebabCase("THIs Is my test   name  ")).toBe("this-is-my-test-name");
    expect(toKebabCase("Yes/No positive(negative) test")).toBe("yes-no-positive-negative-test");
});

test('converts a string to camel case', () => {
    expect(toCamelCase("TB identifier  ")).toBe("tbIdentifier");
    expect(toCamelCase("patient-birth-date")).toBe("patientBirthDate");
    expect(toCamelCase("   PaTient_birth.date--  ")).toBe("patientBirthDate");
    expect(toCamelCase("123 patient birth date")).toBe("123PatientBirthDate");
})

test('checks if a tracked entity attribute is mandatory', () => {
    expect(toFhirCardinality(true)).toBe("1");
})

test('converts DHIS2 value types to FHIR data types', () => {
    expect(toFhirDataType("TEXT")).toBe("string");
    expect(toFhirDataType("TRUE_ONLY")).toBe("boolean");
    expect(toFhirDataType("INTEGER_ZERO_OR_POSITIVE")).toBe("unsignedInt");
    expect(toFhirDataType("INTEGER_NEGATIVE")).toBe("integer");
})