import React from "react";
import { ReactFinalForm, SingleSelectFieldFF, InputFieldFF, Button, hasValue, url, composeValidators } from "@dhis2/ui";
import styles from "./IGConfigForm.module.css";

const IGConfigForm = ({ igConfig, onSubmit }) => {
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Implementation Guide Configuration</h2>
        <ReactFinalForm.Form
          onSubmit={onSubmit}
          initialValues={igConfig}
        >
          {({ handleSubmit: formSubmit, invalid }) => (
            <form onSubmit={formSubmit}>
              <div className={styles.gridContainer}>
                <ReactFinalForm.Field
                  required
                  name="id"
                  label="ID"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="The unique identifier for the IG. Example: fhir.example"
                />

                <ReactFinalForm.Field
                  required
                  name="name"
                  label="Name"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Example: ExampleIG"
                />

                <ReactFinalForm.Field
                  required
                  name="canonical"
                  label="Canonical"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={composeValidators(hasValue, url)}
                  helpText="Example: http://example.org"
                />

                <ReactFinalForm.Field
                  required
                  name="status"
                  label="Status"
                  component={SingleSelectFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Example: draft"
                  options={[
                    { label: 'draft', value: 'draft' },
                    { label: 'active', value: 'active' },
                    { label: 'retired', value: 'retired' },
                    { label: 'unknown', value: 'unknown' },
                  ]}
                />

                <ReactFinalForm.Field
                  required
                  name="version"
                  label="Version"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Example: 0.1.0"
                />

                <ReactFinalForm.Field
                  required
                  name="releaseLabel"
                  label="Release Label"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Example: ci-build"
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.name"
                  label="Publisher"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Example: http://example.org"
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.url"
                  label="Publisher URL"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={composeValidators(hasValue, url)}
                  helpText="Example: http://example.org/example-publisher"
                />
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.button}>
                  <Button type="submit" secondary disabled={invalid}>
                    Next
                  </Button>
                </div>
              </div>
            </form>
          )}
        </ReactFinalForm.Form>
      </div>
    </div>
  );
};

export default IGConfigForm;
