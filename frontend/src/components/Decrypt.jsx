import React, { useState } from "react";
import "../styles/form.css";

const Decrypt = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDecrypt = () => {
        if (!file) {
            alert("Please upload an encrypted file!");
            return;
        }
        // decryption logic will come later
        console.log("Decrypting file:", file.name);
    };

    return (
        <div className="form-container">
            <h2>Decrypt JSON</h2>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button onClick={handleDecrypt}>Decrypt</button>
        </div>
    );
};

export default Decrypt;
