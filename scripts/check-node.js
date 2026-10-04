// Runs before `npm install` / `npm run dev` and stops with a clear message
// if Node is too old (Vite needs 20.19+ or 22.12+). Plain Node, works on any OS.
const [major, minor] = process.versions.node.split(".").map(Number);
const ok = (major === 20 && minor >= 19) || (major === 22 && minor >= 12) || major >= 23;
if (!ok) {
  console.error(`\n  Your Node.js is ${process.versions.node}, this project needs 20.19+ or 22.12+.`);
  console.error("  Download the LTS version from https://nodejs.org, install it, then open a NEW terminal.\n");
  process.exit(1);
}
