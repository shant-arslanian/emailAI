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
} from "@mui/material";

function App() {
  const [draft, setDraft] = useState("");
  const [improved, setImproved] = useState("");
  const [loading, setLoading] = useState(false);

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
      setImproved("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          ✉️ Email Enhancer
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Paste your draft email below and let AI enhance it for you.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          ⏳ Note: The first time you use this, it may take a little while to
          respond.
        </Typography>

        <TextField
          label="Your Draft Email"
          multiline
          minRows={5}
          fullWidth
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          sx={{ my: 2 }}
        />

        <Box textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!draft.trim() || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Improving..." : "Improve Email"}
          </Button>
        </Box>

        {improved && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6">Improved Email:</Typography>
            <Paper elevation={2} sx={{ padding: 2, mt: 1 }}>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {improved}
              </Typography>
            </Paper>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default App;
