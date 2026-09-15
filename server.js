import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Luna está online 🌙");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions:
        "Você é Luna, uma IA pessoal inteligente, parceira e engraçada. Responda sempre em português.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Não consegui responder agora."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Luna online na porta ${PORT}`);
});
