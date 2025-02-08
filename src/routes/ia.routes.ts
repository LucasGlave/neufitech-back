import { Router } from "express";
// import ia from "../controllers/ia.controllers";

const router = Router();

router.post("/generate-responses", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Se requiere un texto" });

  const uniqueId = Math.random().toString(36).substring(7);
  const prompt = `Da tres respuestas de texto al mensaje: ${text}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.Authorization as string,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const choices = data.choices[0].message.content
        .split("\n")
        .filter((line: any) => line.trim() !== "");

      const formattedResponses = choices.map((choice: any, index: any) => ({
        id: `${uniqueId}-${index}`,
        text: choice,
      }));

      return res.json({ id: uniqueId, responses: formattedResponses });
    } else {
      return res.status(500).json({ error: data.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al comunicarse con OpenAI" });
  }
});

export default router;
