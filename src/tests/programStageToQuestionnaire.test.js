import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { registerHelpers } from "../utils/handlebarsHelpers"

registerHelpers();

const template = fs.readFileSync(
    path.join(__dirname, "../../public/assets/Questionnaire.fsh.handlebars"),
    "utf8"
);

const mockProgramStage = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./resources/mockTbOutcomeProgramStage.json"), "utf8")
);

const mockProgramStageWithProgramStageSections = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./resources/mockProgramStageWithProgramStageSections.json"), "utf8")
);

const expectedOutput = fs.readFileSync(
    path.join(__dirname, "./resources/expectedTbOutcomeQuestionnaire.fsh"),
    "utf8"
);

const expectedQuestionnaireWithGroups = fs.readFileSync(
    path.join(__dirname, "./resources/expectedQuestionnaireWithGroups.fsh"),
    "utf8"
);

describe("DHIS2 Tracker Program Stage to Questionnaire Mapping", () => {
    it("Should correctly map a Program Stage to the expected Questionnaire in FSH format", () => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockProgramStage).trim();
        expect(resultFSH).toEqual(expectedOutput.trim());
    });

    it("Should correctly map a Program Stage with sections to the expected Questionnaire with groups in FSH format",() => {
        const compiledTemplate = Handlebars.compile(template);
        const resultFSH = compiledTemplate(mockProgramStageWithProgramStageSections).trim();
        expect(resultFSH).toEqual(expectedQuestionnaireWithGroups.trim());
    });

});