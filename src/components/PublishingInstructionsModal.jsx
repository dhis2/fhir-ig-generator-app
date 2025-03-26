import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Modal, ModalContent, ModalActions, Button } from "@dhis2/ui";

const PublishingInstructionsModal = ({ onClose }) => {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch("/publishInstructions.md");
                if (!response.ok) {
                    throw new Error("Failed to fetch the IG publish instructions.");
                }
                const markdown = await response.text();
                setMarkdownContent(markdown);
            } catch (error) {
                console.error(error);
                setMarkdownContent("Unable to load the IG publish instructions.");
            }
        };

        fetchMarkdown();
    }, []);

    return (
        <Modal onClose={onClose}>
            <ModalContent>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </ModalContent>
            <ModalActions>
                <Button onClick={onClose} primary>
                    Close
                </Button>
            </ModalActions>
        </Modal>
    );
};

export default PublishingInstructionsModal;
