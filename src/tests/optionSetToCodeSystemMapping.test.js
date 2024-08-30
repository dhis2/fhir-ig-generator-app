import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path'
import { convertToFhirName } from "../utils/handlebarsHelpers";
import { registerHelpers } from "../utils/handlebarsHelpers";
registerHelpers();
const template = fs.readFileSync(path.join(__dirname,"../../public/assets/CodeSystem.fsh.handlebars"),'utf8');
const mockOptionSet = JSON.parse(fs.readFileSync(path.join(__dirname,"./resources/mockOptionSet.json"),'utf8'));
const expectedCodeSystemFSH = fs.readFileSync(path.join(__dirname,"./resources/expectedCodeSystem.fsh"),'utf8');

describe("OptionSet to FSH Mapping", () => {
    it("Should correctly map an OptionSet to the expected Code System in FSH format", () => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockOptionSet).trim();
        expect(resultFSH).toEqual(expectedCodeSystemFSH.trim());
    })
})