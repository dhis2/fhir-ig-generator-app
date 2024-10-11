import Handlebars from "handlebars";
import fs from 'fs';
import path from 'path'
import { registerHelpers } from "../utils/handlebarsHelpers";
registerHelpers();
const template = fs.readFileSync(path.join(__dirname,"../../public/assets/ProgramStageLogicalModel.fsh.handlebars"),'utf8');
const mockProgramStage = JSON.parse(fs.readFileSync(path.join(__dirname,"./resources/mockProgramStage.json"),'utf8'));
const expectedLogicalModelFSH = fs.readFileSync(path.join(__dirname,"./resources/expectedProgramStageLogicalModel.fsh"),'utf8');

describe("DHIS2 Tracker Program Stage to Logical Model FSH Mapping", () => {
    it("Should correctly map a Program Stage to the expected Logical Model in FSH format", () => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockProgramStage).trim();
        expect(resultFSH).toEqual(expectedLogicalModelFSH.trim());
    })
})