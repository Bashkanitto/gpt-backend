require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json("aidyn");
});

app.post("/api/request", async (req, res) => {
  const { prompt } = req.body;
  console.log("prompt: ", prompt);

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `hello`,
        },
      ],
      model: "gpt-3.5-turbo-16k",
    });
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error("Error contacting OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
