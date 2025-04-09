import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Modal, ModalContent, ModalActions, Button, CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./PublishingInstructionsModal.module.css";

const PublishingInstructionsModal = ({ onClose }) => {
    const [markdownContent, setMarkdownContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.PUBLIC_URL}/assets/publishInstructions.md`);
                if (!response.ok) {
                    throw new Error("Failed to fetch the IG publish instructions.");
                }
                const markdown = await response.text();
                setMarkdownContent(markdown);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError("Unable to load the IG publish instructions.");
                setIsLoading(false);
            }   
        };

        fetchMarkdown();
    }, []);

    return (
        <Modal onClose={onClose} large>
            <ModalContent>
            <div className={styles.modalContent}>
                    {isLoading ? (
                        <div className={styles.centerWrapper}>
                            <CircularLoader />
                        </div>
                    ) : error ? (
                        <NoticeBox error title="Error">
                            {error}
                        </NoticeBox>
                    ) : (
                        <div className={styles.markdownContainer}>
                            <ReactMarkdown>{markdownContent}</ReactMarkdown>
                        </div>
                    )}
                </div>
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
