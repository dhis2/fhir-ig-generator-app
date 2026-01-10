import { validateCode } from './codeValidation';

export const validateOptionSetCodes = (optionSet) => {
  const errors = [];
  
  if (!optionSet?.options) return errors;
  
  optionSet.options.forEach((option, index) => {
    const validation = validateCode(option.code);
    if (!validation.isValid) {
      errors.push({
        index,
        code: option.code,
        message: validation.message,
        sanitizedSuggestion: validation.sanitized
      });
    }
  });
  
  return errors;
};

export const validatePrograms = (programs) => {
  const validationResults = {
    type: 'codeValidation',
    hasErrors: false,
    optionSetErrors: []
  };
  
  programs.forEach(program => {
    const optionSets = collectOptionSets(program);
    
    optionSets.forEach(optionSet => {
      const errors = validateOptionSetCodes(optionSet);
      if (errors.length > 0) {
        validationResults.hasErrors = true;
        validationResults.optionSetErrors.push({
          programName: program.name,
          optionSetName: optionSet.name,
          errors
        });
      }
    });
  });
  
  return validationResults;
};

const collectOptionSets = (program) => {
  const optionSets = [];
  
  // Check program tracked entity attributes
  if (program.programTrackedEntityAttributes) {
    program.programTrackedEntityAttributes.forEach(ptea => {
      if (ptea.trackedEntityAttribute?.optionSet) {
        optionSets.push(ptea.trackedEntityAttribute.optionSet);
      }
    });
  }
  
  // Check program stages and their data elements
  if (program.programStages) {
    program.programStages.forEach(stage => {
      if (stage.programStageDataElements) {
        stage.programStageDataElements.forEach(psde => {
          if (psde.dataElement?.optionSet) {
            optionSets.push(psde.dataElement.optionSet);
          }
        });
      }
    });
  }
  
  return optionSets;
};

export const validateAll = (programs) => {
  const codeValidation = validatePrograms(programs);
  if (codeValidation.hasErrors) {
    return codeValidation;
  }
  return { hasErrors: false };
};