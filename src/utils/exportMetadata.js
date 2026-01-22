import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import Handlebars from "handlebars";
import { toPascalCase, toKebabCase, registerHelpers } from "./handlebarsHelpers";
import { handleDownload } from "./igDownload";
import YAML from "yaml";

export const exportMetadata = (trackerPrograms, templates, igConfig) => {
  registerHelpers();
  const igZipPath = `${process.env.PUBLIC_URL}/assets/ig.zip`;

  const filename = igConfig?.id ? `${toKebabCase(igConfig.id)}.zip` : 'ig.zip';
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

          generateDhis2CodeSystems(trackerPrograms,templates,igArchive);
        })
        .then(function () {
          handleDownload(igArchive, filename);
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
    questionnaireTemplate,
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
    
    const logicalModelFileName = toPascalCase(stage.name);
    const questionnaireFileName = `${toPascalCase(stage.name)}Questionnaire`

    const programStageFsh = generateFsh(
      stage,
      programStageLogicalModelTemplate
    );
    igArchive.file(
      `input/fsh/models/${logicalModelFileName}.fsh`,
      programStageFsh
    );

    const questionnaireFsh = generateFsh(stage, questionnaireTemplate);
    igArchive.file(
      `input/fsh/questionnaires/${questionnaireFileName}.fsh`,
      questionnaireFsh
    );
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
  let igIniFile = await igArchive.file("ig.ini").async("string");
  const updatedIniFile = igIniFile.replace("fhir.example", igId);
  igArchive.file("ig.ini", updatedIniFile);
};

const generateDhis2CodeSystems = (trackerPrograms, templates, igArchive) => {
  const uniqueDataElements = new Map();
  const uniqueTrackedEntityAttributes = new Map();

  trackerPrograms.forEach(program => {
    program.programTrackedEntityAttributes?.forEach(attribute => {
      const teAttribute = attribute.trackedEntityAttribute;
      if (teAttribute?.id && !uniqueTrackedEntityAttributes.has(teAttribute.id)) {
        uniqueTrackedEntityAttributes.set(teAttribute.id,teAttribute);
      }
    });

    program.programStages?.forEach(stage => {
      stage.programStageDataElements?.forEach(element => {
        const dataElement = element.dataElement;
        if (dataElement?.id && !uniqueDataElements.has(dataElement.id)) {
          uniqueDataElements.set(dataElement.id, dataElement)
        }
      });
    });
  });

  const dataElementsData = {
    elements: Array.from(uniqueDataElements.values()),
    count: uniqueDataElements.size
  };

  const attributesData = {
    elements: Array.from(uniqueTrackedEntityAttributes.values()),
    count: uniqueTrackedEntityAttributes.size
  };

  const dataElementsCodeSystem = generateFsh(
    dataElementsData,
    templates.dataElementsCodeSystemTemplate
  )

  const attributesCodeSystem = generateFsh(
    attributesData,
    templates.attributesCodeSystemTemplate
  )

  igArchive.file(
    "input/fsh/codesystems/Dhis2DataElementsCS.fsh", 
    dataElementsCodeSystem
  );
  
  igArchive.file(
    "input/fsh/codesystems/Dhis2TrackedEntityAttributesCS.fsh", 
    attributesCodeSystem
  );

}
