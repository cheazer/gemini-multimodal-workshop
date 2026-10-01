// FINISHED VERSION of the workshop app.
// Open http://localhost:5173/solution.html to see it running.

import { GoogleGenAI, Type } from "@google/genai";
import { els, getImage, fileToBase64, setOutput, appendOutput, setBusy, showError } from "../src/ui.js";

// Free tier model. If you get rate limited, try "gemini-3.5-flash-lite"
const MODEL = "gemini-3.8-flash";

// ---------- STEP 1: create the client ----------
// Vite exposes .env values that start with VITE_ on import.meta.env
// NOTE: putting a key in browser code is fine for a local prototype, never for a real deployed app
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// ---------- STEP 2 + 3: build the request (text, plus image if there is one) ----------
async function buildContents() {
  const question = els.prompt.value.trim() || "Describe what you see.";
  const image = getImage();

  if (!image) return question; // plain text prompt

  // Multimodal prompt: an image part and a text part in one request
  return [
    { inlineData: { mimeType: image.type, data: await fileToBase64(image) } },
    { text: question },
  ];
}

// ---------- STEP 4: stream the answer so it types out live ----------
async function ask() {
  setBusy(true);
  setOutput("");
  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: await buildContents(),
      config: {
        systemInstruction: "You are a friendly assistant. Keep answers short and clear.",
      },
    });
    for await (const chunk of stream) {
      appendOutput(chunk.text ?? "");
    }
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
}

// ---------- STEP 5: structured output (JSON that matches a schema) ----------
async function askForJson() {
  setBusy(true);
  setOutput("Thinking...");
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: await buildContents(),
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            objects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  colour: { type: Type.STRING },
                },
                required: ["name"],
              },
            },
            mood: { type: Type.STRING, enum: ["happy", "calm", "busy", "serious", "funny", "other"] },
          },
          required: ["summary", "objects", "mood"],
        },
      },
    });
    const data = JSON.parse(response.text);
    setOutput(JSON.stringify(data, null, 2));
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
}

els.askBtn.addEventListener("click", ask);
els.jsonBtn.addEventListener("click", askForJson);
