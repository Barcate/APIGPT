import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import express from "express"; 
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const audiosDir = path.join(__dirname, 'public', 'audios');


if (!fs.existsSync(audiosDir)){
    fs.mkdirSync(audiosDir, { recursive: true });
}

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/generate-speech", async (req, res) => {
  const { texto } = req.body;

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: texto,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = `${Date.now()}.mp3`;
    const filePath = path.join(audiosDir, fileName);
    await fs.promises.writeFile(filePath, buffer);

    res.json({ url: `http://localhost:${port}/audios/${fileName}` });

  } catch (error) {
    console.error("Erro ao gerar o discurso:", error);
    res.status(500).send("Erro ao gerar o discurso.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
