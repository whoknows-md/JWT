import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

// ✅ Inline SVG replacements
const YoutubeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="currentColor"
      d="M549.655 124.083c-6.281-23.65-24.787-42.207-48.497-48.498C498.428 64 288 64 288 64S77.572 64 54.842 75.582c-23.71 6.291-42.216 24.798-48.497 48.498C0 146.428 0 256 0 256s0 109.572 5.345 131.917c6.281 23.65 24.787 42.207 48.497 48.498C77.572 448 288 448 288 448s210.428 0 233.158-11.582c23.71-6.291 42.216-24.798 48.497-48.498C576 365.572 576 256 576 256s0-109.572-5.345-131.917zm-31.258 152.091L232.023 378.026V134.974l286.374 152.091z"
    />
  </svg>
);

const TwitterIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M389.2 48h70.6L305.6 224.2 487 464H397.4L267.6 309.9 119.5 464H78.2L249.3 286.9 64 48h94L245.8 191.7 389.2 48zM364.5 423.8h53.7L138.5 89.2H82.8L364.5 423.8z"
    />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M416 32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zM135.2 416H77.1V192h58.1v224zM106.1 169.1c-19.1 0-34.7-15.6-34.7-34.7c0-19.1 15.6-34.7 34.7-34.7s34.7 15.6 34.7 34.7c0 19.1-15.6 34.7-34.7 34.7zm276.9 246.9h-57.9V326c0-23.7-19.3-43-43-43c-23.7 0-43 19.3-43 43v90H188.1V192h57.9v25.2c9.8-19.7 32.1-43 72-43c55.6 0 100 44.4 100 100v141.8z"
    />
  </svg>
);

export default function ProductPage({ editorView }) {
  const theme = useTheme();

  const faqs = [
    {
      q: "Is it safe to use the JWT Generator for sensitive token data?",
      a: "The header, payload, and secret are securely transmitted via HTTPS to our server for real-time signing. We do not log or store any tokens, secrets, or payloads. All data is immediately discarded after processing, ensuring your data remains private.",
    },
    {
      q: "Do I need an account to generate JWTs online?",
      a: "No, you don’t need to sign up or log in. Our JWT Generator works instantly and completely free — no account required.",
    },
    {
      q: "Can I use custom JSON data to create JWTs?",
      a: "Yes, you can easily input any JSON payload and generate JWT tokens from it, with options to apply JWS signing or JWE encryption for secure data handling.",
    },
    {
      q: "How can I decode or verify a JWT token?",
      a: "Use our built-in JWT Decoder and Verifier to inspect the token header, payload, and signature. It helps ensure the token’s authenticity and integrity.",
    },
  ];

  const features = [
    {
      title: "JWT Token Generator & Builder",
      desc: "Create secure JWT tokens online with support for JWS and JWE standards. Instantly generate, sign, and encrypt tokens with high-grade cryptography.",
    },
    {
      title: "JWT Decoder & Verifier Tool",
      desc: "Easily decode JWT headers and payloads, and verify their signature against the secret key to ensure authenticity and integrity.",
    },
    {
      title: "JSON Web Signatures (JWS)",
      desc: "Generate and validate JSON Web Signatures (JWS) for tamper-proof authentication and message integrity using algorithms like HS256.",
    },
    {
      title: "JSON Web Encryption (JWE)",
      desc: "Encrypt and decrypt JSON Web Encryption (JWE) tokens for maximum data protection and confidentiality. Perfect for sensitive information.",
    },
  ];

  return (
    <Box>
      {/* HERO SECTION */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h1" sx={{ fontSize: "30px", fontWeight: 700 }}>
          JSON Editor Online – Format, Validate & Beautify Instantly
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "15px", mt: 2, maxWidth: "700px", mx: "auto" }}
        >
          Our JSON editor online helps developers, testers, and students edit,
          validate, and beautify JSON directly in the browser. No installation
          needed.
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              editorView.focus();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Start Using JSON Editor Online
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Chrome Extension
          </Button>
        </Box>
      </Box>

      {/* FEATURES SECTION */}
      <Box sx={{ py: 8, px: 4 }}>
        <Typography
          component="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: "38px",
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          JSON Web Token (JWT) Features
        </Typography>
        <Typography
          component="h3"
          sx={{
            textAlign: "center",
            mb: 8,
            fontSize: "20px",
            color: "#333",
          }}
        >
          Featured with JSON Web Signature (JWS) and JSON Web Encryption (JWE)
        </Typography>

        <Grid container spacing={6} sx={{ justifyContent: "center" }}>
          {features.map((f, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Typography
                component="h3"
                sx={{
                  fontSize: "22px",
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.primary.main,
                }}
              >
                {f.title}
              </Typography>
              <Typography
                component="p"
                sx={{ fontSize: "17px", color: "#333", maxWidth: "90%" }}
              >
                {f.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* WHY CHOOSE */}
      <Box sx={{ py: 6, maxWidth: "800px", mx: "auto" }}>
        <Typography
          component="h2"
          sx={{ fontSize: "28px", fontWeight: 600, mb: 3 }}
        >
          Why Choose Our JWT Generator Online?
        </Typography>
        <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
          <li>✅ Free JWT Generator and Decoder – no account or installation required.</li>
          <li>✅ Server-Side Signing – Ensures cryptographic integrity for JWS and JWE standards.</li>
          <li>✅ Strict Privacy Policy – We do not log or store any user tokens or secrets.</li>
          <li>✅ Full Support for all major claims and algorithms like HS256 and RS256.</li>
          <li>✅ Verify, Decode, and Inspect JWTs with real-time validation.</li>
        </ul>
      </Box>

      {/* FAQ SECTION */}
      <Box sx={{ py: 6, maxWidth: "800px", mx: "auto" }}>
        <Typography
          component="h2"
          sx={{ fontSize: "28px", fontWeight: 600, mb: 3 }}
        >
          JSON Web Token (JWT) – Common Questions
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                component="h3"
                sx={{ fontSize: "20px", fontWeight: 600 }}
              >
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* FINAL CTA */}
      <Box
        sx={{
          py: 6,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography component="h2" sx={{ fontSize: "28px", fontWeight: 700 }}>
          Edit JSON Online – Simple, Fast & Free
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3, fontSize: "18px" }}>
          From chaos to clarity in seconds. Use our JSON editor online to
          format, beautify, and validate JSON instantly.
        </Typography>
        <Button
          size="large"
          onClick={() => {
            editorView.focus();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{ backgroundColor: "#fff", color: theme.palette.primary.main }}
        >
          Try JSON Editor Online Now
        </Button>
      </Box>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#f3f8ff] px-6 py-10 text-[#1a2b6d]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          {/* Brand & Summary */}
          <div className="md:w-[30%]">
            <h2 className="text-2xl font-bold">
              <span className="text-[#1a50b3]">JWT</span> Generator
            </h2>
            <p className="mt-3 bg-white shadow-sm p-3 rounded-lg text-[15px] text-gray-700 leading-relaxed">
              JWT Generator is your primary tool for building, decoding, and
              validating JSON Web Tokens. Supports JWS signing and JWE
              encryption. Secure, fast, and developer-friendly.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              &copy; {new Date().getFullYear()} JWT Generator. All rights reserved.
            </p>
          </div>

          {/* Tools & Legal */}
          <div className="md:w-1/4 text-left">
            <h3 className="text-lg font-bold text-[#1a50b3] mb-2">
              JWT Tools & Legal
            </h3>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="/">JWT Generator (Encoder)</a>
              </li>
              <li>
                <a href="/decode">JWT Decoder (Verifier)</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center text-center flex-1">
            <p>
              Write to us at{" "}
              <a
                href="mailto:info@json-format.com"
                className="text-[#1a50b3] font-medium"
              >
                info@json-format.com
              </a>
            </p>
            <p className="mt-3 font-semibold">Follow us:</p>
            <div className="flex justify-center gap-6 my-3">
              <a
                href="https://www.youtube.com/@JsonFormat-w8z"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              >
                <YoutubeIcon width={26} height={26} className="text-[#1a50b3]" />
              </a>
              <a
                href="https://x.com/json_format"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              >
                <TwitterIcon width={26} height={26} className="text-[#1a50b3]" />
              </a>
              <a
                href="https://www.linkedin.com/company/json-format-page"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              >
                <LinkedinIcon width={26} height={26} className="text-[#1a50b3]" />
              </a>
            </div>

            <p className="font-semibold">Our Products</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
                alt="Chrome"
                className="w-8 h-8"
              />
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2b6d] font-medium hover:underline"
              >
                Chrome Extension
              </a>
            </div>

            <p className="text-[#002fff] mt-3 font-medium">
              Latest Release Version: <span className="font-bold">1.1.0</span>
            </p>
          </div>

          {/* Blog Links */}
          <div className="md:w-1/4 text-left">
            <h3 className="text-lg font-bold text-[#1a50b3] mb-2">BLOG</h3>
            <ul className="space-y-2 font-medium">
              <li>Basics</li>
              <li>Features</li>
              <li>Releases</li>
              <li>Resources</li>
            </ul>
          </div>
        </div>
      </footer>
    </Box>
  );
}
