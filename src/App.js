import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

function App() {
  const [draft, setDraft] = useState("");
  const [improved, setImproved] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/improve`,
        {
          emailDraft: draft,
        }
      );
      setImproved(response.data.improvedEmail);
    } catch (error) {
      console.error("Error improving email:", error);
      setImproved("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <AutoFixHighIcon sx={{ color: "#fff", fontSize: 28 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Email Enhancer
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", mt: 1 }}
              >
                Paste your draft and let AI make it shine
              </Typography>
            </Box>

            <TextField
              placeholder="Write or paste your email draft here..."
              multiline
              minRows={6}
              fullWidth
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.35)",
                  opacity: 1,
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!draft.trim() || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                ) : (
                  <AutoFixHighIcon />
                )
              }
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5a6fd6 0%, #6a4194 100%)",
                  boxShadow: "0 6px 24px rgba(102, 126, 234, 0.5)",
                },
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                },
              }}
            >
              {loading ? "Enhancing..." : "Enhance Email"}
            </Button>

            {improved && (
              <Fade in timeout={600}>
                <Box sx={{ mt: 4 }}>
                  <Divider
                    sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontSize: "0.75rem",
                      }}
                    >
                      Enhanced Result
                    </Typography>
                    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                      <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {copied ? (
                          <CheckIcon fontSize="small" />
                        ) : (
                          <ContentCopyIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-line",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.7,
                      }}
                    >
                      {improved}
                    </Typography>
                  </Paper>
                </Box>
              </Fade>
            )}
          </Paper>
        </Fade>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 3,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          First request may take a moment to warm up
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
