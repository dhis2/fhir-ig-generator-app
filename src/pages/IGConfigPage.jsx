import React from "react";
import IGConfigForm from "../components/IGConfigForm";
import { useNavigate } from "react-router-dom";

const IGConfigPage = ({ igConfig, setIgConfig }) => {
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