import React from "react";
import { NoticeBox } from "@dhis2/ui";
import styles from "./ValidationResults.module.css";

// ValidationDisplay components for specific validation types
const CodeValidationDisplay = ({ validationResult }) => (
  <>
    <p>Some option set codes do not meet FHIR standards:</p>
    <ul className={styles.validationList}>
      {validationResult.optionSetErrors.map((optionSetError, index) => (
        <li key={index}>
          <strong>{optionSetError.programName}: {optionSetError.optionSetName}</strong>
          <ul>
            {optionSetError.errors.map((error, idx) => (
              <li key={idx}>
                <span className={styles.code}>"{error.code}"</span> - {error.message}
                {error.sanitizedSuggestion && (
                  <span className={styles.suggestion}>
                    <br/>Suggested: <span className={styles.code}>"{error.sanitizedSuggestion}"</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </>
);

const ValidationResults = ({ validationData }) => {
  if (!validationData) return null;
  
  if (!validationData.hasErrors) {
    return (
      <div className={styles.validationResults}>
        <NoticeBox title="Validation Successful" valid>
          All validation checks passed successfully.
        </NoticeBox>
      </div>
    );
  }
  
  const renderValidationContent = () => {
    // Check which type of validation we're dealing with based on validation data structure
    if (validationData.type === 'codeValidation') {
      return <CodeValidationDisplay validationResult={validationData} />;
    }
    return <p>Validation issues were found. Please review your data.</p>;
  };

  return (
    <div className={styles.validationResults}>
      <NoticeBox title="Validation Issues Found" warning>
        {renderValidationContent()}
      </NoticeBox>
    </div>
  );
};

export default ValidationResults;