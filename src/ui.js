// UI plumbing so main.js can stay focused on the Gemini bits.
// You don't need to change anything in here during the workshop.

const $ = (id) => document.getElementById(id);

export const els = {
  file: $("file"),
  drop: $("drop"),
  preview: $("preview"),
  dropText: $("dropText"),
  prompt: $("prompt"),
  askBtn: $("askBtn"),
  jsonBtn: $("jsonBtn"),
  output: $("output"),
};

let currentFile = null;

// Returns the image the user picked, or null
export function getImage() {
  return currentFile;
}

// Reads a File into the { mimeType, data } shape Gemini wants (data = base64, no prefix)
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function setOutput(text) {
  els.output.textContent = text;
}

export function appendOutput(text) {
  els.output.textContent += text;
}

export function setBusy(busy) {
  els.askBtn.disabled = busy;
  els.jsonBtn.disabled = busy;
}

// Friendly messages for the errors people will actually hit on the day
export function showError(err) {
  const msg = String(err?.message || err);
  let hint = "";
  if (msg.includes("API key") || msg.includes("API_KEY") || msg.includes("401") || msg.includes("403")) {
    hint = "Check your key in .env, then restart `npm run dev`.";
  } else if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
    hint = "Rate limited. Wait a minute, or switch MODEL to a Flash-Lite model.";
  } else if (msg.includes("404")) {
    hint = "Model name not found. Check the MODEL value at the top of main.js.";
  }
  setOutput(`Error: ${msg}${hint ? "\n\nTip: " + hint : ""}`);
  console.error(err);
}

function useFile(file) {
  if (!file || !file.type.startsWith("image/")) return;
  currentFile = file;
  els.preview.src = URL.createObjectURL(file);
  els.preview.hidden = false;
  els.dropText.hidden = true;
}

els.file.addEventListener("change", (e) => useFile(e.target.files[0]));
els.drop.addEventListener("dragover", (e) => {
  e.preventDefault();
  els.drop.classList.add("over");
});
els.drop.addEventListener("dragleave", () => els.drop.classList.remove("over"));
els.drop.addEventListener("drop", (e) => {
  e.preventDefault();
  els.drop.classList.remove("over");
  useFile(e.dataTransfer.files[0]);
});
