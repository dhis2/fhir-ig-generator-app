import React from 'react'
import {
    ReactFinalForm,
    InputFieldFF,
    Button,
    hasValue,
} from '@dhis2/ui'
import styles from './IGConfigForm.module.css'

const IGConfigForm = ({onSubmit}) => {
    return (
        <div className={styles.container}>
            <h2>Implementation Guide Configuration</h2>
            <ReactFinalForm.Form onSubmit={onSubmit} initialValues={{id: 'fhir.example', name: 'Example IG'}}>
            {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* ID Field */}
                        <div className={styles.row}>
                            <ReactFinalForm.Field
                                required
                                name="id"
                                label="ID"
                                component={InputFieldFF}
                                className={styles.inputField}
                                validate={hasValue}
                                helpText="The unique identifier for the IG (e.g., fhir.example)"
                            />
                        </div>

                        {/* Name Field */}
                        <div className={styles.row}>
                            <ReactFinalForm.Field
                                required
                                name="name"
                                label="Name"
                                component={InputFieldFF}
                                className={styles.inputField}
                                validate={hasValue}
                                helpText="The name of the Implementation Guide"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className={styles.row}>
                            <Button type="submit" primary>
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </ReactFinalForm.Form>
        </div>
    )
}

export default IGConfigForm;