import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import Handlebars from "handlebars";
import { toPascalCase, registerHelpers } from "./handlebarsHelpers";
import { handleDownload } from "./igDownload";
import YAML from "yaml";

export const exportMetadata = (trackerPrograms, templates, igConfig) => {
  registerHelpers();
  const igZipPath = `${process.env.PUBLIC_URL}/assets/ig.zip`;
  JSZipUtils.getBinaryContent(igZipPath, function (err, templateIg) {
    if (err) throw err;

    JSZip.loadAsync(templateIg).then(function () {
      const igArchive = new JSZip();
      igArchive
        .loadAsync(templateIg)
        .then(async function () {
          await updateSushiConfigFile(igArchive, igConfig);
          await updateIgIniFile(igArchive, igConfig.id);

          trackerPrograms.forEach((program) => {
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
  const {
    programLogicalModelTemplate,
    programStageLogicalModelTemplate,
    codeSystemTemplate,
    valueSetTemplate,
  } = templates;
  const programFsh = generateFsh(program, programLogicalModelTemplate);
  const logicalModelFileName = toPascalCase(program.name);
  igArchive.file(`input/fsh/models/${logicalModelFileName}.fsh`, programFsh);
  program.programTrackedEntityAttributes.forEach((attribute) => {
    var attr = attribute.trackedEntityAttribute;
    if (attr.optionSet) {
      const fhirFileName = toPascalCase(attr.optionSet.name);
      const codeSystemFsh = generateFsh(attr.optionSet, codeSystemTemplate);
      const valueSetFsh = generateFsh(attr.optionSet, valueSetTemplate);
      igArchive.file(
        `input/fsh/codesystems/${fhirFileName}CS.fsh`,
        codeSystemFsh
      );
      igArchive.file(`input/fsh/valuesets/${fhirFileName}VS.fsh`, valueSetFsh);
    }
  });
  program.programStages.forEach((stage) => {
    const programStageFsh = generateFsh(
      stage,
      programStageLogicalModelTemplate
    );
    const logicalModelFileName = toPascalCase(stage.name);
    igArchive.file(
      `input/fsh/models/${logicalModelFileName}.fsh`,
      programStageFsh
    );
    stage.programStageDataElements.forEach(({ dataElement }) => {
      if (dataElement.optionSet) {
        const fhirFileName = toPascalCase(dataElement.optionSet.name);
        const codeSystemFsh = generateFsh(
          dataElement.optionSet,
          codeSystemTemplate
        );
        const valueSetFsh = generateFsh(
          dataElement.optionSet,
          valueSetTemplate
        );
        igArchive.file(
          `input/fsh/codesystems/${fhirFileName}CS.fsh`,
          codeSystemFsh
        );
        igArchive.file(
          `input/fsh/valuesets/${fhirFileName}VS.fsh`,
          valueSetFsh
        );
      }
    });
  });
};

const generateFsh = (data, template) => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};

const updateSushiConfigFile = async (igArchive, igConfig) => {
  const configFile = await igArchive.file("sushi-config.yaml").async("string");
  let configFileYaml = YAML.parseDocument(configFile);
  Object.entries(igConfig).forEach(([key, value]) => {
    configFileYaml.set(key, value);
  });
  igArchive.file("sushi-config.yaml", configFileYaml.toString());
};

const updateIgIniFile = async (igArchive, igId) => {
  const igIniFile = await igArchive.file("ig.ini").async("string");
  igIniFile.replace("fhir.example", igId);
  const updatedIniFile = igIniFile.replace("fhir.example", igId);
  igArchive.file("ig.ini", updatedIniFile);
};
