import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactFinalForm, SingleSelectFieldFF, InputFieldFF, Button, hasValue, createPattern } from "@dhis2/ui";
import styles from "./IGConfigForm.module.css";

const IGConfigForm = ({ igConfig, setIgConfig }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setIgConfig(values)
    navigate("/program-selector");
  }
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Implementation Guide Configuration</h2>
        <ReactFinalForm.Form
          onSubmit={handleSubmit}
          initialValues={igConfig}
        >
          {({ handleSubmit: formSubmit }) => (
            <form onSubmit={formSubmit}>
              <div className={styles.gridContainer}>
                <ReactFinalForm.Field
                  required
                  name="id"
                  label="ID"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="The unique identifier for the IG. Default: fhir.example"
                />

                <ReactFinalForm.Field
                  required
                  name="name"
                  label="Name"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: ExampleIG"
                />

                <ReactFinalForm.Field
                  required
                  name="canonical"
                  label="Canonical"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: http://example.org"
                />

                <ReactFinalForm.Field
                  required
                  name="status"
                  label="Status"
                  component={SingleSelectFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: draft"
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
                  helpText="Default: 0.1.0"
                />

                <ReactFinalForm.Field
                  required
                  name="releaseLabel"
                  label="Release Label"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: ci-build"
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.name"
                  label="Publisher"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: DHIS2"
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.url"
                  label="Publisher URL"
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText="Default: https://dhis2.org"
                />
              </div>

              <div className={styles.button}>
                <Button type="submit" primary large>
                  Save & Continue
                </Button>
              </div>
            </form>
          )}
        </ReactFinalForm.Form>
      </div>
    </div>
  );
};

export default IGConfigForm;
