import { toCamelCase, toKebabCase, toPascalCase } from "../utils/handlebarsHelpers";

test('converts a string to pascal case', () => {
    expect(toPascalCase("THIs Is my test   name__ ")).toBe("ThisIsMyTestName");
});

test('converts a string to pascal case, with upper-case abbrevations and acronyms', () => {
    expect(toPascalCase("TB Program")).toBe("TBProgram");
});

test('converts a string to kebab case', () => {
    expect(toKebabCase("THIs Is my test   name  ")).toBe("this-is-my-test-name");
});

test('converts a string to camel case', () => {
    expect(toCamelCase("TB identifier  ")).toBe("tbIdentifier");
})