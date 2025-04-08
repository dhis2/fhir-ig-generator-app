import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path';
import { registerHelpers } from "../utils/handlebarsHelpers";

registerHelpers();

const template = fs.readFileSync(path.join(__dirname, "../../public/assets/AttributesCodeSystem.fsh.handlebars"), "utf8");
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, "./resources/mockAttributes.json"), "utf8"));
const emptyMockData = JSON.parse(fs.readFileSync(path.join(__dirname, "./resources/mockEmptyCodeSystem.json"), "utf8"));
const expectedOutput = fs.readFileSync(path.join(__dirname, "./resources/expectedAttributesCodeSystem.fsh"), "utf8");
const expectedEmptyOutput = 
`CodeSystem: Dhis2TrackedEntityAttributesCS
Id: dhis2-tracked-entity-attributes-cs
Title: "Dhis2 Tracked Entity Attribute Code System"
Description: "Code system for 0 unique DHIS2 tracked entity attributes"`;

describe("DHIS2 Tracked Entity Attributes to CodeSystem FSH Mapping", () => {
  it("Should correctly map tracked entity attributes to a Code System in FSH format", () => {
    const compiledTemplate = Handlebars.compile(template);
    const resultFSH = compiledTemplate(mockData).trim();
    expect(resultFSH).toEqual(expectedOutput.trim());
  });
  
  it("Should handle an empty collection of tracked entity attributes", () => {
    const compiledTemplate = Handlebars.compile(template);
    const resultFSH = compiledTemplate(emptyMockData).trim();
    expect(resultFSH).toEqual(expectedEmptyOutput.trim());
  });
});