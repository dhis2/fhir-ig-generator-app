import { useConfig } from "@dhis2/app-runtime";

export const fetchTemplate = async (templateName) => {
    try {
        const response = await fetch(`/assets/${templateName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch template: \"${templateName}\"`)
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching template ${templateName}:`, error);
        throw new Error(`Error fetching template ${templateName}`);
    }
};

export const fetchOptionSets = async (selectedProgramIds, baseUrl) => {
    try {
        const responses = await Promise.all(
            selectedProgramIds.map((id) =>
                fetch(`${baseUrl}/api/programs/${id}/optionSets`).then((response) => response.json())
            )
        );
        return responses.flatMap((response) => response.optionSets || []);
    } catch (error) {
        console.error("Error fetching option sets:", error);
        throw new Error("Error fetching option sets");
    }
};
