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
import { FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function ProductPage({ editorView }) {
  const theme = useTheme();

  const faqs = [
    {
      q: "Is it safe to use JSON-Format.com with sensitive data?",
      a: "Yes, your data is processed locally in your browser. We do not store or transmit your JSON.",
    },
    {
      q: "Do I need to create an account to use JSON-Format.com?",
      a: "No account or signup is required. All tools are free and accessible instantly.",
    },
    {
      q: "Can I convert JSON data to other formats like CSV or YAML?",
      a: "Yes, our platform supports conversion to CSV, YAML, and other formats.",
    },
    {
      q: "How can I read my JSON data using JSON-Format.com?",
      a: "Use the tree view or text mode to explore and debug your JSON data easily.",
    },
  ];

  const features = [
    {
      title: "Online JSON Formatter",
      desc: "Format and validate JSON in seconds with zero setup.",
    },
    {
      title: "JSON Viewer",
      desc: "Navigate JSON in tree or text mode for improved readability.",
    },
    {
      title: "JSON Compare",
      desc: "Spot differences between two JSON files instantly.",
    },
    {
      title: "JSON Beautifier",
      desc: "Make JSON clean and structured with proper indentation.",
    },
  ];

  return (
    <Box>
      {/* HERO */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h1" sx={{ fontSize: "40px", fontWeight: 700 }}>
          JSON Editor Online – Format, Validate & Beautify Instantly
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "18px", mt: 2, maxWidth: "700px", mx: "auto" }}
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

      {/* FEATURES */}
      <Box sx={{ py: 8, px: 4 }}>
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            mb: 8,
            fontSize: "38px",
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          JSON Editor Online – Simplify Your JSON Workflow
        </Typography>
        <Grid container spacing={6} sx={{ justifyContent: "center" }}>
          {features.map((f, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Typography
                component="h2"
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
          variant="h2"
          sx={{ fontSize: "28px", fontWeight: 600, mb: 3 }}
        >
          Why Choose Our JSON Editor Online?
        </Typography>
        <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
          <li>✅ 100% Free & Online – no signup required</li>
          <li>✅ Beginner & professional friendly</li>
          <li>✅ Secure – your JSON data stays private</li>
          <li>✅ All-in-one: Format, Beautify, Validate, View, Compare</li>
        </ul>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: 6, maxWidth: "800px", mx: "auto" }}>
        <Typography
          variant="h2"
          sx={{ fontSize: "28px", fontWeight: 600, mb: 3 }}
        >
          JSON Editor Online – Common Questions
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h3"
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
        <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: 700 }}>
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
          sx={{ backgroundColor: "#fff" }}
        >
          Try JSON Editor Online Now
        </Button>
      </Box>

      {/* FOOTER */}
      <footer className="w-full bg-[#f3f8ff] px-6 py-10 text-[#1a2b6d]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="md:w-[30%]">
            <h2 className="text-2xl font-bold">
              <span className="text-[#1a50b3]">JSON</span> Format
            </h2>
            <p className="mt-3 bg-white shadow-sm p-3 rounded-lg text-[15px] text-gray-700 leading-relaxed">
              JSON Format is your go-to tool for formatting, validating, and
              beautifying JSON data. Fast, secure, and beginner-friendly.
            </p>
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
                <FaYoutube size={26} className="text-[#1a50b3]" />
              </a>
              <a
                href="https://x.com/json_format"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              >
                <FaTwitter size={26} className="text-[#1a50b3]" />
              </a>
              <a
                href="https://www.linkedin.com/company/json-format-page"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                <FaLinkedin size={26} className="text-[#1a50b3]" />
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

          {/* Right Column – Blog Links */}
          <div className="md:w-1/4 text-left">
            <h3 className="text-lg font-bold text-[#1a50b3] mb-2">BLOG</h3>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#6a5acd] rounded-full"></span>{" "}
                Basics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ff8c00] rounded-full"></span>{" "}
                Features
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ff4500] rounded-full"></span>{" "}
                Releases
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#3cb371] rounded-full"></span>{" "}
                Resources
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Box> // ✅ Closing the main Box
  );
}
