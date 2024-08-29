import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import Handlebars from "handlebars";
import { convertToFhirName, registerHelpers } from "./handlebarsHelpers";
import { handleDownload } from "./igDownload";

export const exportMetadata = (template, optionSets) => {
    JSZipUtils.getBinaryContent("/assets/ig.zip", function (err, templateIg) {
        if (err) throw err;

        JSZip.loadAsync(templateIg).then(function () {
            const igArchive = new JSZip();
            igArchive
                .loadAsync(templateIg)
                .then(function () {
                    const compiledTemplate = Handlebars.compile(template);
                    optionSets.forEach((optionSet) => {
                        const fhirFileName = convertToFhirName(optionSet.name);
                        igArchive.file(
                            `input/fsh/codesystems/${fhirFileName}.fsh`,
                            compiledTemplate(optionSet)
                        );
                    });
                })
                .then(function () {
                    handleDownload(igArchive);
                });
        });
    });
};