from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.crypto_utils import encrypt_jws_jwe, decrypt_jws_jwe

app = Flask(__name__)
CORS(app)  # enable CORS so frontend can call the API

@app.route("/api/encrypt", methods=["POST"])
def encrypt():
    """
    Expects JSON body:
    {
        "header": {...},
        "payload": {...},
        "secret": "your_secret_key"
    }
    Returns:
    {
        "encrypted": "base64_encrypted_string"
    }
    """
    data = request.get_json()
    try:
        header = data.get("header")
        payload = data.get("payload")
        secret = data.get("secret")

        if not header or not payload or not secret:
            return jsonify({"error": "header, payload and secret are required"}), 400

        encrypted_text = encrypt_jws_jwe(header, payload, secret)
        return jsonify({"encrypted": encrypted_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/decrypt", methods=["POST"])
def decrypt():
    """
    Expects JSON body:
    {
        "encrypted": "base64_encrypted_string",
        "secret": "your_secret_key"
    }
    Returns:
    {
        "payload": {...},
        "header": {...}
    }
    """
    data = request.get_json()
    try:
        encrypted_text = data.get("encrypted")
        secret = data.get("secret")

        if not encrypted_text or not secret:
            return jsonify({"error": "encrypted and secret are required"}), 400

        payload = decrypt_jws_jwe(encrypted_text, secret)
        return jsonify({"payload": payload})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
