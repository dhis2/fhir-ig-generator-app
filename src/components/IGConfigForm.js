import React from "react";
import { ReactFinalForm, SingleSelectFieldFF, InputFieldFF, Button, hasValue, createPattern } from "@dhis2/ui";
import styles from "./IGConfigForm.module.css";

const IGConfigForm = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      <h2>Implementation Guide Configuration</h2>
      <ReactFinalForm.Form
        onSubmit={onSubmit}
        initialValues={{
          id: "fhir.example",
          name: "Example IG",
          canonical: "http://example.org",
          status: "draft",
          version: "0.1.0",
          releaseLabel: "ci-build",
          publisher: {
            name: "Example Publisher",
            url: "http://example.org/example-publisher",
          },
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="id"
                label="ID"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="The unique identifier for the IG. Default: fhir.example"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="name"
                label="Name"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: ExampleIG"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="canonical"
                label="Canonical"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: http://example.org"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="status"
                label="Status"
                component={SingleSelectFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: draft"
                options={[
                                { label: 'Draft', value: 'draft' },
                                { label: 'Active', value: 'active' },
                                { label: 'Retired', value: 'retired' },
                                { label: 'Unknown', value: 'unknown' },
                            ]}
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="version"
                label="Version"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: 0.1.0"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="releaseLabel"
                label="Release Label"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: ci-build"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="publisher.name"
                label="Publisher"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: Example Publisher"
              />
            </div>
            <div className={styles.row}>
              <ReactFinalForm.Field
                required
                name="publisher.url"
                label="Publisher URL"
                component={InputFieldFF}
                className={styles.inputField}
                validate={hasValue}
                helpText="Default: http://example.org/example-publisher"
              />
            </div>

            <div className={styles.row}>
              <Button type="submit" primary large>
                Set Configuration
              </Button>
            </div>
          </form>
        )}
      </ReactFinalForm.Form>
    </div>
  );
};

export default IGConfigForm;
