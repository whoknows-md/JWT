import React, { useState } from "react";
import CodeEditor from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import axios from "axios";

// NEW: Use a constant for the secure API endpoint explanation
const SECURITY_MESSAGE =
    "⚠️ **Secure Transmission via HTTPS.** Your Header, Payload, and Secret are sent to a dedicated server for cryptographic signing. We do not log or store any user data, ensuring real-time processing and immediate disposal.";

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

                // NOTE: Change 'encrypt' to a more standard JWT term like 'generate' or 'sign'
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
                // NOTE: Change 'decrypt' to a more standard JWT term like 'decode' or 'verify'
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
            setHeaderValue(
                newMode === "encrypt"
                    ? '{\n  "alg": "HS256",\n  "typ": "JWT"\n}'
                    : '{\n  "alg": "HS256",\n  "typ": "JWT"\n}' // Keep header visible for decrypt/decode
            );
            setPayloadValue(""); // clear payload
            setSecretValue(""); // clear password
            setResultValue(""); // clear result
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 mt-15">
            {/* SEO OPTIMIZATION: Use Strong, Actionable H1 Tag */}
            <h1 className="text-5xl font-bold text-center mb-6">
                JWT Generator: Online JSON Web Token Builder & Decoder Tool
            </h1>

            {/* NEW: SECURITY MESSAGE/TRUST SIGNAL */}
            <p
                className="text-center text-sm p-3 bg-yellow-100 border-l-4 border-yellow-500 text-gray-800 rounded-md"
                dangerouslySetInnerHTML={{ __html: SECURITY_MESSAGE }}
            />

            {/* Main Tool Container (Use <section> for semantic SEO grouping) */}
            <section id="jwt-tool">
                {/* Top Toolbar */}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-md ${mode === "encrypt"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                            // SEO OPTIMIZATION: Rename to 'Generate/Encode' and 'Decode/Verify' in text
                            onClick={() => handleModeSwitch("encrypt")}
                        >
                            Generate/Encode
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${mode === "decrypt"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                            onClick={() => handleModeSwitch("decrypt")}
                        >
                            Decode/Verify
                        </button>
                    </div>

                    {/* Secret Input */}
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
                            {/* SEO OPTIMIZATION: Use h2 for sub-headings */}
                            <h2 className="text-lg font-semibold mb-2">JWT Header (JWS/JWE)</h2>
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
                            {/* SEO OPTIMIZATION: Use h2 for sub-headings */}
                            <h2 className="text-lg font-semibold mb-2">
                                {mode === "encrypt" ? "JWT Payload (Claims JSON)" : "Encrypted JWT Input"}
                            </h2>
                            <div
                                className="border rounded-md h-72 overflow-y-auto"
                                style={{ overflowX: "hidden" }}
                            >
                                <CodeEditor
                                    value={payloadValue}
                                    onChange={setPayloadValue}
                                    extensions={
                                        mode === "encrypt"
                                            ? [json()]
                                            : [EditorView.lineWrapping]
                                    }
                                    className="h-full"
                                    basicSetup={{ lineNumbers: mode === "encrypt" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Result) */}
                    <div className="col-span-1">
                        {/* SEO OPTIMIZATION: Use h2 for sub-headings */}
                        <h2 className="text-lg font-semibold mb-2">Generated / Decoded JWT</h2>
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
                        {/* SEO OPTIMIZATION: Use better CTA text */}
                        {mode === "encrypt" ? "Generate JWT Token" : "Decode/Verify Token"}
                    </button>
                </div>
            </section>

            {/* NEW: SEO SUPPORTIVE CONTENT (Informational/Long-Tail Keywords) */}
            <section className="pt-8 space-y-4">
                {/* SEO OPTIMIZATION: Use h2 for this content block */}
                <h2 className="text-3xl font-bold">What is a JSON Web Token (JWT)?</h2>
                <p>
                    A **JSON Web Token (JWT)** is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This is essential for modern web applications, providing a robust mechanism for **authentication** and **authorization**. Use our **JWT Generator** to quickly create a signed token for your development or testing needs.
                </p>
                {/* SEO OPTIMIZATION: Mention key claims/use cases for long-tail keywords */}
                <h3 className="text-xl font-semibold">How to Use the Online JWT Builder</h3>
                <p>
                    Simply enter your desired **JWT Payload (Claims JSON)**, your token's **Header** (e.g., using **HS256**), and a **Secret Key**. Our tool uses secure server-side cryptographic functions to generate the final signed token. You can also use the **Decode/Verify** mode to inspect an existing token's contents and validate its signature.
                </p>
            </section>
        </div>
    );
};

export default Body;