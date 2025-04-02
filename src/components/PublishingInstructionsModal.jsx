import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Modal, ModalContent, ModalActions, Button } from "@dhis2/ui";
import styles from "./PublishingInstructionsModal.module.css";

const PublishingInstructionsModal = ({ onClose }) => {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/assets/publishInstructions.md`);
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
        <Modal onClose={onClose} large>
            <ModalContent>
            <div className={styles.modalContent}>
                    <h1>Publishing the Generated Implementation Guide (IG)</h1>
                    <p>Follow the steps below to build the IG and view its contents:</p>
                    
                    <h2>1. Unzip the Generated IG Bundle</h2>
                    <ul>
                        <li>Extract the downloaded ZIP file into a directory of your choice.</li>
                    </ul>

                    <h2>2. Set Up Required Tools</h2>
                    <p>Ensure the following tools are installed and available in your environment:</p>
                    <ul>
                        <li>
                            <strong>
                                <a href="https://github.com/FHIR/sushi" target="_blank" rel="noopener noreferrer">SUSHI</a></strong> 
                                : For compiling FHIR Shorthand into FHIR definitions.
                            <pre className={styles.codeBlock}>
                                npm install -g fsh-sushi
                            </pre>
                        </li>
                        <li>
                            <strong><a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">
                                    Java JDK
                                </a></strong>: (version 17 or higher): Required for running the IG Publisher.
                        </li>
                        <li>
                        <strong>
                                <a href="https://www.ruby-lang.org/en/downloads/" target="_blank" rel="noopener noreferrer">
                                    Ruby
                                </a>
                            </strong>{" "}
                            and{" "}
                            <strong>
                                <a href="https://jekyllrb.com/docs/installation/" target="_blank" rel="noopener noreferrer">
                                    Jekyll
                                </a>
                            </strong>
                            : Required for the IG Publisher.
                        </li>
                    </ul>

                    <h2>3. Run the IG Publisher</h2>
                    <p>The IG Publisher will generate the IG content, validate it, and create a browsable website.</p>
                    <ol>
                        <li>
                            Open a terminal and navigate to the extracted IG directory:
                            <pre className={styles.codeBlock}>
                                cd path/to/ig
                            </pre>
                        </li>
                        <li>
                            Run the <code>_updatePublisher</code> script to download the latest version of the IG Publisher:
                            <pre className={styles.codeBlock}>
                                # Linux/macOS <br />
                                ./_updatePublisher.sh
                                </pre>  
                                <pre className={styles.codeBlock}>
                                # Windows <br />
                                _updatePublisher.bat
                                </pre>
                        </li>
                        <li>
                            Run the <code>_genonce</code> script to generate the IG content:
                            <pre className={styles.codeBlock}>
                                # Linux/macOS <br />
                                ./_genonce.sh
                                </pre>  
                                <pre className={styles.codeBlock}>
                                # Windows <br />
                                _genonce.bat
                                </pre>
                        </li>
                    </ol>
                    <h2>4. View the Generated IG</h2>
                    <ol>
                        <li>Navigate to the <code>output</code> folder in the extracted IG directory.</li>
                        <li>Open the <code>index.html</code> file in a web browser.</li>
                        <li>Explore the IG, including the <strong>Artifacts</strong> tab, to view all generated FHIR artifacts.</li>
                    </ol>
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
