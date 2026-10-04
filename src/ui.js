// UI plumbing: image picking, resizing, saving your key, showing output.
// You don't need to change anything in here.

const $ = (id) => document.getElementById(id);

export const els = {
  stepKey: $("stepKey"),
  stepImg: $("stepImg"),
  stepAsk: $("stepAsk"),
  keyInput: $("keyInput"),
  keySave: $("keySave"),
  keyStatus: $("keyStatus"),
  model: $("model"),
  preset: $("preset"),
  system: $("system"),
  file: $("file"),
  drop: $("drop"),
  preview: $("preview"),
  dropText: $("dropText"),
  clearImg: $("clearImg"),
  prompt: $("prompt"),
  askBtn: $("askBtn"),
  jsonBtn: $("jsonBtn"),
  output: $("output"),
};

// ---------- API key ----------
// Saved in this browser only (localStorage). Never put it in your code.
// Falls back to VITE_GEMINI_API_KEY in a .env file if you prefer that.
const KEY_NAME = "gemini_api_key";

function safeGet(name) {
  try { return localStorage.getItem(name) || ""; } catch { return ""; }
}
function safeSet(name, value) {
  try { value ? localStorage.setItem(name, value) : localStorage.removeItem(name); } catch { /* private mode */ }
}

let memoryKey = "";
export function getApiKey() {
  return (memoryKey || safeGet(KEY_NAME) || import.meta.env.VITE_GEMINI_API_KEY || "").trim();
}

function refreshKeyStatus() {
  const key = getApiKey();
  els.keyStatus.textContent = key ? `✓ key saved (…${key.slice(-4)})` : "no key yet";
  els.keyStatus.dataset.ok = key ? "1" : "";
  markStep("stepKey", !!key);
}

// ticks off the 1-2-3 progress bar at the top of the page
export function markStep(id, done = true) {
  els[id]?.classList.toggle("done", done);
}

els.keySave.addEventListener("click", () => {
  memoryKey = els.keyInput.value.trim();
  safeSet(KEY_NAME, memoryKey);
  els.keyInput.value = "";
  refreshKeyStatus();
});
refreshKeyStatus();

// ---------- image ----------
let currentImage = null; // { mimeType, base64 }

export function getImage() {
  return currentImage;
}

function readAsBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

// Shrinks big phone photos to max 1280px JPEG so uploads are quick on busy wifi.
// If the browser can't decode the format (eg HEIC on Windows), send the original.
async function prepareImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return { mimeType: "image/jpeg", base64: await readAsBase64(blob), url: URL.createObjectURL(blob) };
  } catch {
    return { mimeType: file.type || "image/jpeg", base64: await readAsBase64(file), url: null };
  }
}

export async function useFile(file) {
  if (!file || !(file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name))) return;
  els.dropText.textContent = "Loading image…";
  const img = await prepareImage(file);
  currentImage = { mimeType: img.mimeType, base64: img.base64 };
  if (img.url) {
    els.preview.src = img.url;
    els.preview.hidden = false;
    els.dropText.hidden = true;
  } else {
    els.dropText.textContent = `${file.name} ready (no preview for this format)`;
  }
  els.clearImg.hidden = false;
  markStep("stepImg");
}

// loads one of the sample pictures in public/samples/
export async function useSample(name) {
  const file = name === "chart" ? "chart.png" : "receipt.jpg";
  const res = await fetch(`./samples/${file}`);
  const blob = await res.blob();
  await useFile(new File([blob], file, { type: blob.type }));
}

function clearImage() {
  currentImage = null;
  els.file.value = "";
  els.preview.hidden = true;
  els.preview.removeAttribute("src");
  els.dropText.hidden = false;
  els.dropText.textContent = "Click to choose a photo, drag one in, or paste a screenshot";
  els.clearImg.hidden = true;
  markStep("stepImg", false);
}

els.file.addEventListener("change", (e) => useFile(e.target.files[0]));
els.clearImg.addEventListener("click", (e) => { e.preventDefault(); clearImage(); });
els.drop.addEventListener("dragover", (e) => { e.preventDefault(); els.drop.classList.add("over"); });
els.drop.addEventListener("dragleave", () => els.drop.classList.remove("over"));
els.drop.addEventListener("drop", (e) => {
  e.preventDefault();
  els.drop.classList.remove("over");
  useFile(e.dataTransfer.files[0]);
});
// paste a screenshot straight in with Ctrl+V / Cmd+V
document.addEventListener("paste", (e) => {
  const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
  if (item) useFile(item.getAsFile());
});

// ---------- output ----------
export function setOutput(text) { els.output.textContent = text; }
export function appendOutput(text) { els.output.textContent += text; }
export function setBusy(busy) {
  els.askBtn.disabled = busy;
  els.jsonBtn.disabled = busy;
}

// Friendly messages for the errors people actually hit
export function showError(err) {
  const msg = String(err?.message || err);
  let hint = "";
  if (/api key|api_key|401|403|permission/i.test(msg)) {
    hint = "Your key isn't working. Paste it again at the top and press Save. Make sure you copied the whole thing.";
  } else if (/429|resource_exhausted|quota/i.test(msg)) {
    hint = "Free tier rate limit. Wait a minute, or pick the Flash-Lite model in the dropdown.";
  } else if (/404|not found/i.test(msg)) {
    hint = "Model not found. Pick the other model in the dropdown (Google renames models sometimes).";
  } else if (/failed to fetch|network/i.test(msg)) {
    hint = "Network problem. Check your wifi, then try again.";
  }
  setOutput(`Error: ${msg}${hint ? "\n\nTip: " + hint : ""}`);
  console.error(err);
}
