import React, { useState } from "react";
import IGConfigForm from "../components/IGConfigForm";

const IGConfigPage = ({ igConfig, setIgConfig }) => {
    return (
        <IGConfigForm igConfig={igConfig} onSubmit={setIgConfig} />
    )
};

export default IGConfigPage