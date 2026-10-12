const config = {
    id: '1928228f-edbe-461d-b805-8ed94aa582a3',
    type: 'app',
    title: "FHIR IG Generator",
    description: "This app helps author FHIR IGs based on DHIS2 tracker metadata by automatically transforming DHIS2 tracker program metadata into standardized FHIR implementation guides."
    entryPoints: {
        app: './src/App.jsx',
    },
    minDHIS2Version: '2.39'
}

module.exports = config
