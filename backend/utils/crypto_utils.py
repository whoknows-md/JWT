import json
import base64
import os
from cryptography.hazmat.primitives import padding, hashes, hmac
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def encrypt_jws_jwe(header: dict, payload: dict, secret: str) -> str:
    """
    Symmetric JWS + JWE-like encryption.
    - header: JWT header dict
    - payload: JSON payload dict
    - secret: secret key (string)
    Returns: base64 encoded IV + ciphertext
    """
    # --- JWS signing (HMACSHA256) ---
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
    signature_data = f"{header_b64}.{payload_b64}".encode()
    
    h = hmac.HMAC(secret.encode(), hashes.SHA256(), backend=default_backend())
    h.update(signature_data)
    signature = base64.urlsafe_b64encode(h.finalize()).decode().rstrip("=")
    
    jws_token = f"{header_b64}.{payload_b64}.{signature}"

    # --- JWE-like encryption (AES-256-CBC) ---
    iv = os.urandom(16)
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(jws_token.encode()) + padder.finalize()
    
    key_bytes = secret.encode().ljust(32, b'\0')[:32]  # make 32 bytes for AES-256
    cipher = Cipher(algorithms.AES(key_bytes), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    encrypted = base64.b64encode(iv + ciphertext).decode()
    return encrypted


def decrypt_jws_jwe(encrypted_text: str, secret: str) -> dict:
    """
    Decrypt AES-256-CBC encrypted JWS token and verify signature.
    Returns payload as dict.
    """
    data = base64.b64decode(encrypted_text)
    iv = data[:16]
    ciphertext = data[16:]
    
    key_bytes = secret.encode().ljust(32, b'\0')[:32]
    cipher = Cipher(algorithms.AES(key_bytes), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()
    
    unpadder = padding.PKCS7(128).unpadder()
    jws_token = unpadder.update(padded_plaintext) + unpadder.finalize()
    jws_token = jws_token.decode()
    
    # --- Verify JWS signature ---
    try:
        header_b64, payload_b64, signature_b64 = jws_token.split(".")
    except ValueError:
        raise ValueError("Invalid token format")
    
    signature_data = f"{header_b64}.{payload_b64}".encode()
    h = hmac.HMAC(secret.encode(), hashes.SHA256(), backend=default_backend())
    h.update(signature_data)
    h.verify(base64.urlsafe_b64decode(signature_b64 + "=="))  # pad base64 if needed
    
    payload_json = base64.urlsafe_b64decode(payload_b64 + "==").decode()
    return json.loads(payload_json)
