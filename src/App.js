import React, { useEffect, useState } from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import Handlebars from 'handlebars'
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

const optionSetsQuery = {
    optionSets: {
        resource: 'optionSets',
        params: {
            fields: ['id','name','displayName','description','options[code,name,description]']
        }
    },
}

const MyApp = () => {
    const [template, setTemplate] = useState('');

    const handleDownload = async (zip) => {
        const blob = await zip.generateAsync({ type: 'blob'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ig.zip';
        a.click();
        URL.revokeObjectURL(url);
    };

    const generateCodeSystem = (data) => {
        Handlebars.registerHelper('fhirId', function (str) {
            return str.replace(/\s+/g, '').replace('(', '_').replace(')', '_').replace('/', '_').replace('-', '_');
        });
        var compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(data)
    }

    const exportMetadata = (data) => {
        JSZipUtils.getBinaryContent('/assets/ig.zip', function (err, templateIg) {
            if (err) {
                throw err;
            }

            JSZip.loadAsync(templateIg).then(function () {
                const igArchive = new JSZip();

                igArchive.loadAsync(templateIg)
                    .then(function () {
                        for (var key in data.optionSets.optionSets) {
                            igArchive.file(`input/fsh/CodeSystem${data.optionSets.optionSets[key].name}.fsh`, generateCodeSystem(data.optionSets.optionSets[key]));
                        }
                    }).then(function () { handleDownload(igArchive) });
            });
        });

    };

    useEffect(() => {
        fetch('/assets/CodeSystem.fsh.handlebars')
            .then((response) => response.text())
            .then((template) => {
                setTemplate(template);
            });
    }, []);

    return (<div className={classes.container}>
        <DataQuery query={optionSetsQuery}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                        <button onClick={() => exportMetadata(data)}>Export FHIR IG</button>
                    </>
                )
            }}
        </DataQuery>
    </div>
    )
}

export default MyApp
