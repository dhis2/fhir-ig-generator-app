import React from "react";
import { ReactFinalForm, SingleSelectFieldFF, InputFieldFF, Button, hasValue, createPattern } from "@dhis2/ui";
import styles from "./IGConfigForm.module.css";
import i18n from "@dhis2/d2-i18n";

const IGConfigForm = ({ igConfig, onSubmit }) => {
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{i18n.t("Implementation Guide Configuration")}</h2>
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
                  label={i18n.t("ID")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("The unique identifier for the IG.")} ${i18n.t("Example")}: fhir.example`}
                />

                <ReactFinalForm.Field
                  required
                  name="name"
                  label={i18n.t("Name")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: ExampleIG`}
                />

                <ReactFinalForm.Field
                  required
                  name="canonical"
                  label={i18n.t("Canonical")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: http://example.org`}
                />

                <ReactFinalForm.Field
                  required
                  name="status"
                  label={i18n.t("Status")}
                  component={SingleSelectFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: draft`}
                  options={[
                    { label: i18n.t("draft"), value: "draft" },
                    { label: i18n.t("active"), value: "active" },
                    { label: i18n.t("retired"), value: "retired" },
                    { label: i18n.t("unknown"), value: "unknown" },
                  ]}
                />

                <ReactFinalForm.Field
                  required
                  name="version"
                  label={i18n.t("Version")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: 0.1.0`}
                />

                <ReactFinalForm.Field
                  required
                  name="releaseLabel"
                  label={i18n.t("Release Label")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: ci-build`}
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.name"
                  label={i18n.t("Publisher")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: http://example.org`}
                />

                <ReactFinalForm.Field
                  required
                  name="publisher.url"
                  label={i18n.t("Publisher URL")}
                  component={InputFieldFF}
                  className={styles.inputField}
                  validate={hasValue}
                  helpText={`${i18n.t("Example")}: http://example.org/example-publisher`}
                />
              </div>
              <div className={styles.buttonRow}>
                <div className={styles.button}>
                  <Button type="submit" secondary disabled={invalid}>
                    {i18n.t("Next")}
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
