// server/index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/improve", async (req, res) => {
  const { emailDraft } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an email writing assistant. The user will give you a draft email they have written. Your job is to enhance and improve the writing of that same email — fix grammar, improve clarity, adjust tone to be professional yet natural, and make it more polished. Do NOT write a reply to the email. Do NOT add a subject line. Do NOT include any dashes or hyphens as bullet points or separators. Return ONLY the improved version of the user's original email, nothing else.",
          },
          { role: "user", content: emailDraft },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ improvedEmail: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
