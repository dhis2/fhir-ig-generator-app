import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path'
import { registerHelpers } from "../utils/handlebarsHelpers";
registerHelpers();
const template = fs.readFileSync(path.join(__dirname,"../../public/assets/ProgramLogicalModel.fsh.handlebars"),'utf8');
const mockProgram = JSON.parse(fs.readFileSync(path.join(__dirname,"./resources/mockTbProgram.json"),'utf8'));
const expectedLogicalModelFSH = fs.readFileSync(path.join(__dirname,"./resources/expectedTbProgram.fsh"),'utf8');

describe("DHIS2 Tracker Program to Logical Model FSH Mapping", () => {
    it("Should correctly map a tracker program to the expected logical model", () => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockProgram).trim();
        expect(resultFSH).toEqual(expectedLogicalModelFSH.trim());
    })
})