export const validateCode = (code) => {
    if (typeof code !== 'string') {
        return { isvalid: false, sanitized: '', message: 'code must be a string' }
    }
    // FHIR code regex from the FHIR spec
    const fhirCodeRegex = /^[^\s]+( [^\s]+)*$/;

    const trimmed = code.trim();
    const hasLeadingOrTrailingSpace = trimmed !== code;
    const hasDoubleSpace = code.includes('  ');
    const sanitized = trimmed.replace(/\s+/g, ' ');

    const isValid = fhirCodeRegex.test(code);
    let message = '';
    if (hasLeadingOrTrailingSpace) {
        message = 'Code has leading or trailing whitespace';
    } else if (hasDoubleSpace) {
        message = 'Code contains multiple consecutive spaces';
    } else if (!isValid) {
        message = 'Invalid FHIR code format';
    }

    return {
        isValid,
        sanitized,
        message,
        original: code
    };
};