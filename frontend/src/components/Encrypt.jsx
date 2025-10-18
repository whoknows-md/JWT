import React, { useState } from "react";
import "../styles/form.css";

const Encrypt = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleEncrypt = () => {
        if (!file) {
            alert("Please upload a JSON file!");
            return;
        }
        // encryption logic will come later
        console.log("Encrypting file:", file.name);
    };

    return (
        <div className="form-container">
            <h2>Encrypt JSON</h2>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleEncrypt}>Encrypt</button>
        </div>
    );
};

export default Encrypt;
