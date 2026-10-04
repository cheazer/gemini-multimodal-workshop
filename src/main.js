// Wires the page to the Gemini code. Read src/gemini.js for the interesting part,
// and edit src/presets.js to make the app your own.

import { askStream, askJson, buildContents } from "./gemini.js";
import { PRESETS } from "./presets.js";
import { els, getApiKey, getImage, setOutput, appendOutput, setBusy, showError } from "./ui.js";

// fill the preset dropdown
PRESETS.forEach((p, i) => els.preset.add(new Option(p.name, String(i))));

function applyPreset() {
  const p = PRESETS[Number(els.preset.value)] || PRESETS[0];
  els.system.value = p.systemInstruction;
  els.prompt.value = p.question;
}
els.preset.addEventListener("change", applyPreset);
applyPreset();

function requestBase() {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("No API key yet. Get a free one at aistudio.google.com/apikey and paste it at the top.");
  const question = els.prompt.value.trim() || "Describe what you see.";
  return {
    apiKey,
    model: els.model.value,
    systemInstruction: els.system.value.trim() || undefined,
    contents: buildContents(question, getImage()),
  };
}

els.askBtn.addEventListener("click", async () => {
  setBusy(true);
  setOutput("Thinking…");
  let first = true;
  try {
    await askStream({
      ...requestBase(),
      onChunk: (text) => {
        if (first) { setOutput(""); first = false; }
        appendOutput(text);
      },
    });
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
});

els.jsonBtn.addEventListener("click", async () => {
  setBusy(true);
  setOutput("Thinking…");
  try {
    const preset = PRESETS[Number(els.preset.value)] || PRESETS[0];
    const data = await askJson({ ...requestBase(), schema: preset.schema });
    setOutput(JSON.stringify(data, null, 2));
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
});
