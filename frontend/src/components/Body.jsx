import React, { useState } from "react";
import CodeEditor from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import axios from "axios";

const Body = () => {
    const [mode, setMode] = useState("encrypt");
    const [headerValue, setHeaderValue] = useState(
        '{\n  "alg": "HS256",\n  "typ": "JWT"\n}'
    );
    const [payloadValue, setPayloadValue] = useState("");
    const [secretValue, setSecretValue] = useState("");
    const [resultValue, setResultValue] = useState("");

    const handleAction = async () => {
        try {
            if (mode === "encrypt") {
                // validate JSON
                try {
                    JSON.parse(headerValue);
                    JSON.parse(payloadValue);
                } catch (err) {
                    alert("Header or Payload is not valid JSON.");
                    return;
                }

                const response = await axios.post("http://localhost:5000/api/encrypt", {
                    header: JSON.parse(headerValue),
                    payload: JSON.parse(payloadValue),
                    secret: secretValue,
                });
                setResultValue(response.data.encrypted);
            } else {
                if (!payloadValue.trim()) {
                    alert("Please provide the encrypted input to decrypt.");
                    return;
                }
                const response = await axios.post("http://localhost:5000/api/decrypt", {
                    encrypted: payloadValue,
                    secret: secretValue,
                });
                setResultValue(JSON.stringify(response.data.payload, null, 2));
            }
        } catch (err) {
            console.error(err);
            alert("Action failed! Check console for details.");
        }
    };

    const handleModeSwitch = (newMode) => {
        if (newMode !== mode) {
            setMode(newMode);
            setPayloadValue(""); // clear payload
            setSecretValue(""); // clear password
            setResultValue(""); // clear result
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 mt-15">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-center mb-6">
                JSON Web Token - JWT Generator
            </h1>
            {/* Top Toolbar */}
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded-md ${mode === "encrypt"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => handleModeSwitch("encrypt")}
                    >
                        Encrypt
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${mode === "decrypt"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => handleModeSwitch("decrypt")}
                    >
                        Decrypt
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Secret Key"
                    value={secretValue}
                    onChange={(e) => setSecretValue(e.target.value)}
                    className="px-4 py-2 border rounded-md text-sm w-48"
                />
            </div>

            {/* Editor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column (Header + Payload / Encrypted Input) */}
                <div className="col-span-1 md:col-span-2 flex flex-col space-y-6">
                    {/* Header */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Header (JWS/JWE)</h3>
                        <div className="border rounded-md h-25 overflow-auto">
                            <CodeEditor
                                value={headerValue}
                                onChange={setHeaderValue}
                                extensions={[json()]}
                                className="h-full"
                            />
                        </div>
                    </div>

                    {/* Payload / Encrypted Input */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            {mode === "encrypt" ? "Payload JSON" : "Encrypted Input"}
                        </h3>
                        <div
                            className="border rounded-md h-72 overflow-y-auto"
                            style={{ overflowX: "hidden" }}
                        >
                            <CodeEditor
                                value={payloadValue}
                                onChange={setPayloadValue}
                                extensions={
                                    mode === "encrypt"
                                        ? [json()] // JSON editor
                                        : [EditorView.lineWrapping] // wrap encrypted input
                                }
                                className="h-full"
                                basicSetup={{ lineNumbers: mode === "encrypt" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column (Result) */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-2">Result</h3>
                    <div className="border rounded-md h-[29rem] overflow-auto">
                        <CodeEditor
                            value={resultValue}
                            readOnly={true}
                            extensions={[EditorView.lineWrapping, ...(mode === "encrypt" ? [] : [json()])]}
                            className="h-full"
                            basicSetup={{ lineNumbers: false }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleAction}
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                >
                    {mode === "encrypt" ? "Encrypt JSON" : "Decrypt JSON"}
                </button>
            </div>
        </div>
    );
};

export default Body;
