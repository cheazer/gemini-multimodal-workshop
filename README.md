# Snap & Ask: a multimodal web app with the Gemini API

GDG on Campus University of Aberdeen workshop.

> **At the workshop? Follow [WORKSHOP.md](WORKSHOP.md)**. It's the step-by-step guide in plain English, with checkpoints.

A web app where you show Gemini a picture, ask it a question, and get an answer back, either as normal text or as clean JSON your code can use. It works straight after you clone it, and by the end you'll have changed it into your own app.

**Free.** You only need a Google account. No card, no billing.
**Works on** Windows, macOS and Linux. No laptop setup? Use the browser option below.

## Option A: run it on your laptop (recommended)

You need **Node.js 22 LTS** (or 20.19+). Check with `node -v`. Get it from [nodejs.org](https://nodejs.org), install, then open a **new** terminal.

These commands are the same on Windows (PowerShell or Command Prompt), macOS and Linux:

```bash
git clone https://github.com/cheazer/gemini-multimodal-workshop.git
cd gemini-multimodal-workshop
npm install
npm run dev
```

No git? On GitHub click the green **Code** button, then **Download ZIP**, unzip it, open a terminal in that folder and run the last two commands.

Your browser opens the app (if not, go to the `http://localhost:5173` link in the terminal).

## Option B: no install, runs in your browser

Go to `https://stackblitz.com/github/cheazer/gemini-multimodal-workshop` and wait for it to start. Works on any laptop with Chrome or Edge, including school or locked-down machines.

## Get your free API key (2 mins)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and sign in with a **personal** Google account (uni accounts are sometimes blocked)
2. Click **Create API key** and copy it
3. Paste it into the box at the top of the app and press **Save**

The key is saved in your browser only. It is not in the code, so it's safe to push this repo to GitHub.

## Use it

- no photo handy? click **🧾 Receipt** or **📊 Chart** to load a sample
- or add your own: click the box, drag one in, or paste a screenshot with Ctrl+V / Cmd+V
- pick what kind of app it is from the list (Fridge chef, Receipt scanner, Alt text writer…)
- press **Ask Gemini** for a normal answer, or **Get structured JSON** for data

## How it works

| file | what it is |
|---|---|
| `src/gemini.js` | **the Gemini part.** Every call to Gemini, explained step by step. Read this one |
| `src/presets.js` | **the bit you change.** Each preset is a different app on the same code |
| `src/main.js` | connects the page to the Gemini code |
| `src/ui.js` | page plumbing (image upload, resizing, saving your key). No need to touch |

The whole trick is in `buildContents()`: a multimodal request is an array of **parts**, one image part and one text part, sent in a single call.

## Make it yours

Open `src/presets.js`, copy one preset, and change:

1. `name`: what shows in the dropdown
2. `systemInstruction`: its personality and rules
3. `question`: the default question
4. `schema`: the shape of the JSON you want back

Save, and the page reloads with your new app. Ideas: plant identifier, outfit rater, homework diagram explainer, "is this parking sign telling me I can park here", meme caption generator.

## Put it online (optional, free)

Full beginner steps are in [WORKSHOP.md, Part 5](WORKSHOP.md#part-5-put-it-online-bonus-10-mins). Short version:

1. Create a new **public** repo on GitHub and push this code to it
2. In the repo go to **Settings > Pages**, set **Source** to **GitHub Actions**
3. Go to **Actions** and re-run "Deploy to GitHub Pages" if the first run failed
4. Your app is live at `https://cheazer.github.io/REPO-NAME/`

Anyone who opens it pastes their own key, so yours is never exposed.

## Common problems

| you see | fix |
|---|---|
| `'node' is not recognized` / `command not found` | install Node from nodejs.org, then open a NEW terminal |
| `Your Node.js is ... this project needs 20.19+` | install the current LTS from nodejs.org |
| `npm install` errors on Windows | close VS Code, run the terminal normally (not inside OneDrive folders if you can avoid it), try again |
| `API key not valid` | paste the key again and press Save, make sure you copied all of it |
| `429` or `RESOURCE_EXHAUSTED` | free tier rate limit, wait a minute or pick the Flash-Lite model |
| `404` model not found | pick the other model in the dropdown |
| AI Studio says not available | you're on a uni or work Google account, use a personal one |
| port 5173 in use | Vite picks the next port, use the link the terminal prints |

## Good to know

- free tier prompts can be used by Google to improve their products, so don't upload anything private
- this calls Gemini straight from the browser with the user's own key. Great for learning and personal tools. For an app where **you** pay for everyone, call Gemini from a server or use [Firebase AI Logic](https://firebase.google.com/docs/ai-logic) so your key stays secret

## Keep learning

- [Gemini API docs](https://ai.google.dev/gemini-api/docs)
- [Getting started with the Gemini API and Web Apps pathway](https://developers.google.com/learn/pathways/solution-ai-gemini-getting-started-web) (do the quiz for a badge)
- [Gemini cookbook](https://github.com/google-gemini/cookbook)
