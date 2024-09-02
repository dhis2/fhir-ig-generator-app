import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import Handlebars from "handlebars";
import { convertToFhirName, registerHelpers } from "./handlebarsHelpers";
import { handleDownload } from "./igDownload";

export const exportMetadata = (trackerPrograms, templates) => {

    registerHelpers();
    JSZipUtils.getBinaryContent("/assets/ig.zip", function (err, templateIg) {
        if (err) throw err;

        JSZip.loadAsync(templateIg).then(function () {
            const igArchive = new JSZip();
            igArchive
                .loadAsync(templateIg)
                .then(function () {
                    trackerPrograms.forEach((program) => {
                        console.log("Program: ",program)
                        generateFshFilesForProgram(program, templates, igArchive);
                    });
                })
                .then(function () {
                    handleDownload(igArchive);
                });
        });
    });
};

const generateFshFilesForProgram = (program, templates, igArchive) => {
    const { codeSystemTemplate, valueSetTemplate} = templates;
    program.programStages.forEach((stage) => {
        stage.programStageDataElements.forEach(({ dataElement }) => {
            if (dataElement.optionSet) {
                const fhirFileName = convertToFhirName(dataElement.optionSet.name)
                const codeSystemFsh = generateFsh(dataElement.optionSet,codeSystemTemplate);
                const valueSetFsh = generateFsh(dataElement.optionSet,valueSetTemplate);

                igArchive.file(`input/fsh/codesystems/${fhirFileName}CS.fsh`, codeSystemFsh);
                igArchive.file(`input/fsh/valuesets/${fhirFileName}VS.fsh`, valueSetFsh);
            }
        });
    });
}

const generateFsh = (data, template) => {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(data);
};