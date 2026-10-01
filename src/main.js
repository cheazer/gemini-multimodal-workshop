// WORKSHOP STARTER. Work through the TODOs in order.
// Stuck? The finished version is in solutions/main.js
// (open http://localhost:5173/solution.html to see it running)

import { GoogleGenAI, Type } from "@google/genai";
import { els, getImage, fileToBase64, setOutput, appendOutput, setBusy, showError } from "./ui.js";

// Free tier model. If you get rate limited, try "gemini-3.5-flash-lite"
const MODEL = "gemini-3.8-flash";

// ---------- STEP 1: create the client ----------
// TODO 1: create a GoogleGenAI client using your key from .env
// hint: new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })
const ai = null;

// ---------- STEP 2 + 3: build the request ----------
async function buildContents() {
  const question = els.prompt.value.trim() || "Describe what you see.";
  const image = getImage();

  // STEP 2 works with just text, so this is enough to get your first answer
  if (!image) return question;

  // TODO 3: make it multimodal. Return an array with two parts:
  //   { inlineData: { mimeType: image.type, data: await fileToBase64(image) } }
  //   { text: question }
  return question;
}

// ---------- STEP 2 + 4: call Gemini ----------
async function ask() {
  setBusy(true);
  setOutput("Thinking...");
  try {
    // TODO 2: call ai.models.generateContent({ model: MODEL, contents: await buildContents() })
    //         then setOutput(response.text)

    // TODO 4 (after step 3 works): swap to ai.models.generateContentStream(...)
    //         clear the output, then:  for await (const chunk of stream) appendOutput(chunk.text ?? "")
    //         bonus: add config: { systemInstruction: "..." } to give it a personality

    setOutput("TODO 2: call Gemini here");
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
}

// ---------- STEP 5: structured output ----------
async function askForJson() {
  setBusy(true);
  setOutput("Thinking...");
  try {
    // TODO 5: call generateContent with
    //   config: {
    //     responseMimeType: "application/json",
    //     responseSchema: { type: Type.OBJECT, properties: { summary: { type: Type.STRING }, ... } }
    //   }
    // then: setOutput(JSON.stringify(JSON.parse(response.text), null, 2))

    setOutput("TODO 5: ask for JSON here");
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
}

els.askBtn.addEventListener("click", ask);
els.jsonBtn.addEventListener("click", askForJson);

// keeps the linter quiet until you use these
void ai, void Type, void fileToBase64, void appendOutput;
