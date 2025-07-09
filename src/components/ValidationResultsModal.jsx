import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalContent, ModalActions, Button, NoticeBox } from "@dhis2/ui";

const CodeValidationDisplay = ({ validationResult }) => (
  <>
    <p>Some option set codes do not meet FHIR standards:</p>
    <ul>
      {validationResult.optionSetErrors.map((optionSetError, index) => (
        <li key={`optionSet-${optionSetError.programName}-${optionSetError.optionSetName}-${index}`}>
          <strong>{optionSetError.programName}: {optionSetError.optionSetName}</strong>
          <ul>
            {optionSetError.errors.map((error, idx) => (
              <li key={`error-${error.code}-${idx}`}>
                <span>"{error.code}"</span> - {error.message}
                {error.sanitizedSuggestion && (
                  <span>
                    <br/>Suggested: <span>"{error.sanitizedSuggestion}"</span>
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

const ValidationResultsModal = ({ validationData, onClose }) => {
  if (!validationData) return null;

  return (
    <Modal onClose={onClose} position="middle">
      <ModalContent>
        <div>
          {!validationData.hasErrors ? (
            <NoticeBox title="Validation Successful" valid>
              All validation checks passed successfully.
            </NoticeBox>
          ) : (
            <NoticeBox title="Validation Issues Found" warning>
              {validationData.type === 'codeValidation' ? (
                <CodeValidationDisplay validationResult={validationData} />
              ) : (
                <p>Validation issues were found. Please review your data.</p>
              )}
            </NoticeBox>
          )}
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} primary>
          {validationData.hasErrors ? "Close" : "Continue"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

CodeValidationDisplay.propTypes = {
  validationResult: PropTypes.shape({
    optionSetErrors: PropTypes.arrayOf(
      PropTypes.shape({
        programName: PropTypes.string.isRequired,
        optionSetName: PropTypes.string.isRequired,
        errors: PropTypes.arrayOf(
          PropTypes.shape({
            index: PropTypes.number,
            code: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            sanitizedSuggestion: PropTypes.string
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired
};

ValidationResultsModal.propTypes = {
  validationData: PropTypes.shape({
    hasErrors: PropTypes.bool,
    type: PropTypes.string,
    optionSetErrors: PropTypes.array
  }),
  onClose: PropTypes.func.isRequired
};

export default ValidationResultsModal;