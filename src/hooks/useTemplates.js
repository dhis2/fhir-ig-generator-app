import { useEffect, useState } from 'react';

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
                const loadedTemplates = {
                    programLogicalModelTemplate: await fetchTemplate('ProgramLogicalModel.fsh.handlebars'),
                    programStageLogicalModelTemplate: await fetchTemplate('ProgramStageLogicalModel.fsh.handlebars'),
                    codeSystemTemplate: await fetchTemplate('CodeSystem.fsh.handlebars'),
                    valueSetTemplate: await fetchTemplate('ValueSet.fsh.handlebars'),
                };
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