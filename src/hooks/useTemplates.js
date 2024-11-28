import { useEffect, useState } from 'react';

export const templateFileNames = [
    { key: 'programLogicalModelTemplate', fileName: 'ProgramLogicalModel.fsh.handlebars' },
    { key: 'programStageLogicalModelTemplate', fileName: 'ProgramStageLogicalModel.fsh.handlebars' },
    { key: 'codeSystemTemplate', fileName: 'CodeSystem.fsh.handlebars' },
    { key: 'valueSetTemplate', fileName: 'ValueSet.fsh.handlebars' },
]

export const useTemplates = () => {
    const [templates, setTemplates] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchTemplate = async (templateName) => {
            const response = await fetch(`${process.env.PUBLIC_URL}/assets/${templateName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch template: ${templateName}`);
            }
            return await response.text();
        };

        const loadTemplates = async () => {
            try {
                const loadedTemplates = {};
                for (const { key, fileName } of templateFileNames) {
                    loadedTemplates[key] = await fetchTemplate(fileName);
                }

                if (isMounted) {
                    setTemplates(loadedTemplates);
                }
                
            } catch (error) {
                console.error(error);
                if (isMounted) {
                    setError(error);
                }
            }
        };

        loadTemplates();

        return () => {
            isMounted = false;
        };
    }, []);

    return { templates, error };
};