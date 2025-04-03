import React from "react";
import IGConfigForm from "../components/IGConfigForm";
import { useNavigate } from "react-router-dom";
import { useIgConfig } from "../contexts/IgConfigContext";

const IGConfigPage = () => {
    const { igConfig, setIgConfig } = useIgConfig();
    const navigate = useNavigate();

    const handleFormSubmit = (values) => {
        setIgConfig(values);
        navigate("/program-selector");
    }
    return (
        <IGConfigForm igConfig={igConfig} onSubmit={handleFormSubmit} />
    )
};

export default IGConfigPage