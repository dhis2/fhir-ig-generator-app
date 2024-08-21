import React, { useEffect, useState } from 'react';
import { useOptionSets } from './hooks/useOptionSets';
import WarningMessage from './components/WarningMessage';
import ExportButton from './components/ExportButton';
import { validateCodes } from './utils/codeValidation';
import { handleDownload } from './utils/igDownload';
import { convertToFhirName, registerHelpers } from './utils/handlebarsHelpers';
import Handlebars from 'handlebars';
import classes from './App.module.css';
import JSZipUtils from 'jszip-utils';
import JSZip from 'jszip';

const MyApp = () => {
    const [template, setTemplate] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const {data, error, loading} = useOptionSets();

    useEffect(() => {
        registerHelpers();
        fetch('/assets/CodeSystem.fsh.handlebars')
            .then((response) => response.text())
            .then((template) => {
                setTemplate(template);
            });
    }, []);

    useEffect(() => {
        if (data && validateCodes(data.optionSets.optionSets)) {
            setShowWarning(true);
        }
    }, [data]);

    const exportMetadata = () => {
        JSZipUtils.getBinaryContent('/assets/ig.zip', function (err, templateIg) {
            if (err) throw err;

            JSZip.loadAsync(templateIg).then(function () {
                const igArchive = new JSZip();
                igArchive.loadAsync(templateIg)
                    .then(function () {
                        const compiledTemplate = Handlebars.compile(template);
                        data.optionSets.optionSets.forEach(optionSet => {
                            const fhirFileName = convertToFhirName(optionSet.name)
                            igArchive.file(`input/fsh/codesystems/${fhirFileName}.fsh`, compiledTemplate(optionSet));
                        });
                    }).then(function () {
                        handleDownload(igArchive);
                    });
            });
        });
    };

    if (error) {
        console.error("Error fetching option sets:", error);
        return <span>ERROR</span>;
    }
    if (loading) return <span>...</span>;

    return (
        <div className={classes.container}>
            {showWarning && <WarningMessage />}
            <ExportButton onClick={exportMetadata} />
        </div>
    );
};

export default MyApp;