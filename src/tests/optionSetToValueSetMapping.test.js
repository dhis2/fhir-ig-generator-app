import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path'
import { convertToFhirName } from "../utils/handlebarsHelpers";
import { registerHelpers } from "../utils/handlebarsHelpers";
registerHelpers();
const template = fs.readFileSync(path.join(__dirname,"../../public/assets/ValueSet.fsh.handlebars"),'utf8');
const mockOptionSet = JSON.parse(fs.readFileSync(path.join(__dirname,"./resources/mockOptionSet.json"),'utf8'));
const expectedValueSetFSH = fs.readFileSync(path.join(__dirname,"./resources/expectedValueSet.fsh"),'utf8');

describe("OptionSet to Value Set FSH Mapping", () => {
    it("Should correctly map an OptionSet to the expected Value Set in FSH format", () => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockOptionSet).trim();
        expect(resultFSH).toEqual(expectedValueSetFSH.trim());
    })
})