import React from "react";
import "../styles/result.css";

const Result = ({ data }) => {
    return (
        <div className="result-container">
            <h2>Result</h2>
            <pre>{data ? JSON.stringify(data, null, 2) : "No data yet"}</pre>
        </div>
    );
};

export default Result;
