// Wires the page to the Gemini code. Read src/gemini.js for the interesting part,
// and edit src/presets.js to make the app your own.

import { askStream, askJson, buildContents } from "./gemini.js";
import { PRESETS } from "./presets.js";
import { els, getApiKey, getImage, setOutput, appendOutput, setBusy, showError, markStep, useSample } from "./ui.js";

// fill the preset dropdown
PRESETS.forEach((p, i) => els.preset.add(new Option(p.name, String(i))));

function applyPreset() {
  const p = PRESETS[Number(els.preset.value)] || PRESETS[0];
  els.system.value = p.systemInstruction;
  els.prompt.value = p.question;
}
els.preset.addEventListener("change", applyPreset);
applyPreset();

// sample pictures: load the image and switch to an app that suits it
const SAMPLE_SETUP = {
  receipt: { preset: "Receipt scanner" },
  chart: { preset: "Describe anything", question: "What does this chart show? What's the main trend?" },
};
document.querySelectorAll("[data-sample]").forEach((btn) =>
  btn.addEventListener("click", async () => {
    const name = btn.dataset.sample;
    const setup = SAMPLE_SETUP[name];
    const i = PRESETS.findIndex((p) => p.name === setup.preset);
    if (i >= 0) { els.preset.value = String(i); applyPreset(); }
    if (setup.question) els.prompt.value = setup.question;
    await useSample(name);
  })
);

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
    markStep("stepAsk");
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
    markStep("stepAsk");
  } catch (err) {
    showError(err);
  } finally {
    setBusy(false);
  }
});
