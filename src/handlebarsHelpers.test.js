import { convertToFhirId, convertToFhirName } from "./utils/handlebarsHelpers";

test('converts a string to FHIR name format', () => {
    expect(convertToFhirName("THIs Is my test   name__ ")).toBe("ThisIsMyTestName");
});

test('converts a string to FHIR id format', () => {
    expect(convertToFhirId("THIs Is my test   name  ")).toBe("this-is-my-test-name");
});