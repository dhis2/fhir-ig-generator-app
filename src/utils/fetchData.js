import { useConfig } from "@dhis2/app-runtime";

export const fetchCodeSystemTemplate = async () => {
    try {
        const response = await fetch("/assets/CodeSystem.fsh.handlebars");
        return await response.text();
    } catch (error) {
        console.error("Error fetching code system template:", error);
        throw new Error("Error fetching code system template");
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
