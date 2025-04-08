import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path';
import { registerHelpers } from "../utils/handlebarsHelpers";

registerHelpers();

const template = fs.readFileSync(path.join(__dirname, "../../public/assets/DataElementsCodeSystem.fsh.handlebars"), "utf8");
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, "./resources/mockDataElements.json"), "utf8"));
const emptyMockData = JSON.parse(fs.readFileSync(path.join(__dirname, "./resources/mockEmptyCodeSystem.json"), "utf8"));
const expectedOutput = fs.readFileSync(path.join(__dirname, "./resources/expectedDataElementsCodeSystem.fsh"), "utf8");

const expectedEmptyOutput = 
`CodeSystem: Dhis2DataElementsCS
Id: dhis2-data-elements-cs
Title: "DHIS2 Data Elements Code System"
Description: "Code system for 0 unique DHIS2 data elements from all selected programs"`;

describe("DHIS2 Data Elements to CodeSystem FSH Mapping", () => {
  it("Should correctly map data elements to a Code System in FSH format", () => {
    const compiledTemplate = Handlebars.compile(template);
    const resultFSH = compiledTemplate(mockData).trim();
    expect(resultFSH).toEqual(expectedOutput.trim());
  });
  
  it("Should handle an empty collection of data elements", () => {
    const compiledTemplate = Handlebars.compile(template);
    const resultFSH = compiledTemplate(emptyMockData).trim();
    expect(resultFSH).toEqual(expectedEmptyOutput.trim());
  });
});