// ============================================================
//  THE GEMINI PART
//  Everything that talks to Gemini lives in this one file.
//  We read through it together in the workshop, step by step.
// ============================================================

import { GoogleGenAI } from "@google/genai";

// ---------- STEP 1: the client ----------
// One object that holds your API key and knows how to call Gemini.
// We make a fresh one each call so a newly pasted key works straight away.
function getClient(apiKey) {
  return new GoogleGenAI({ apiKey });
}

// ---------- STEP 2 + 3: build the request ----------
// Text only: contents can just be a string.
// Multimodal: contents is an array of "parts". One part is the image
// (as base64 text), one part is the question. Same request, same call.
export function buildContents(question, image) {
  if (!image) return question;

  return [
    { inlineData: { mimeType: image.mimeType, data: image.base64 } },
    { text: question },
  ];
}

// ---------- STEP 4: stream the answer ----------
// generateContentStream sends the reply back in chunks,
// so the answer types out live instead of appearing all at once.
// systemInstruction = standing rules for the model (role, tone, length).
export async function askStream({ apiKey, model, systemInstruction, contents, onChunk }) {
  const ai = getClient(apiKey);
  const stream = await ai.models.generateContentStream({
    model,
    contents,
    config: { systemInstruction },
  });
  for await (const chunk of stream) {
    onChunk(chunk.text ?? "");
  }
}

// ---------- STEP 5: structured output ----------
// responseMimeType + responseSchema force Gemini to reply with JSON
// in exactly the shape you asked for. Free text is for humans,
// JSON is for code: now you can save it, sort it, or show it in your own UI.
export async function askJson({ apiKey, model, systemInstruction, contents, schema }) {
  const ai = getClient(apiKey);
  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  return JSON.parse(response.text);
}
