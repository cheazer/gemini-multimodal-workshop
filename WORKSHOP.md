# Workshop guide: follow along here

Keep this page open during the workshop. Each part ends with a **✅ checkpoint** so you know you're on track. Fallen behind? Jump to the next checkpoint, everything still works.

**You don't need to be good at coding.** You won't write an app from scratch. The app already works, and you'll learn how it works and then change it into your own idea.

**By the end you'll have:**
- a working app on your laptop that understands photos
- your own version of it, doing something you picked
- (bonus) a link to it online you can send anyone

---

## Part 1: get it running (15 mins)

### 1.1 Check you have Node.js

Node.js is a free program that lets your computer run JavaScript tools. Open a terminal:

- **Windows:** press the Windows key, type `PowerShell`, open it
- **Mac:** press Cmd + Space, type `Terminal`, open it
- **Linux:** you know where it is 😉

Type this and press Enter:

```bash
node -v
```

You should see a number like `v22.12.0`. If you get an error or a number below 20, download the **LTS** version from [nodejs.org](https://nodejs.org), install it, then **close the terminal and open a new one**.

### 1.2 Download the app

```bash
git clone https://github.com/YOUR-USERNAME/gemini-multimodal-workshop.git
cd gemini-multimodal-workshop
```

No git? On the GitHub page click the green **Code** button, then **Download ZIP** and unzip it. Then in your terminal type `cd ` (with a space after it), **drag the unzipped folder into the terminal window**, and press Enter. Works on Windows and Mac.

### 1.3 Install and start it

```bash
npm install
npm run dev
```

`npm install` downloads the bits the app needs (about a minute). `npm run dev` starts the app and opens it in your browser.

> Leave this terminal open. If you close it, the app stops. To start it again later, run `npm run dev` again.

### 1.4 Get your free key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with a **personal** Google account (uni accounts are sometimes blocked)
3. Click **Create API key**, then copy it
4. Paste it into the box at the top of the app, then press **Save**

**What's a key?** A password that lets your app use Gemini. It's free, and it's saved only in your browser. Don't share it or put it in your code.

### 1.5 Try it

Click **🧾 Receipt** under "No photo handy?", then press **Ask Gemini**.

> ✅ **Checkpoint 1:** all three steps at the top of the page are green, and Gemini has told you what was bought on the receipt.

Stuck for more than 5 minutes? Put your hand up, or use the no-install version: open `https://stackblitz.com/github/YOUR-USERNAME/gemini-multimodal-workshop` in Chrome or Edge.

---

## Part 2: play with it (10 mins)

Try these and notice what changes:

- pick different apps from the **"Choose what kind of app it is"** list
- use your own photos: your desk, your lunch, a sign, your pet. Or paste a screenshot with **Ctrl+V** (Windows) / **Cmd+V** (Mac)
- press **Get structured JSON** instead of **Ask Gemini**. Same question, but now the answer is tidy data
- open **Advanced settings** and change the system instruction to something silly, then ask again

> ✅ **Checkpoint 2:** you've had an answer from your own photo, and seen a JSON answer.

---

## Part 3: understand it (20 mins)

Open the folder in a code editor. **VS Code** is free: [code.visualstudio.com](https://code.visualstudio.com). Use File > Open Folder.

Open **`src/gemini.js`**. It's short and every part has a comment. We'll read it together:

| part | what it does | in plain English |
|---|---|---|
| Step 1 | `new GoogleGenAI({ apiKey })` | connect to Gemini using your key |
| Step 2 | `contents` is just a string | send a question, get an answer |
| Step 3 | `contents` is a list of two "parts" | send a **picture and a question together**. This is what multimodal means |
| Step 4 | `generateContentStream` | the answer types out word by word instead of appearing all at once |
| Step 5 | `responseSchema` | force the answer into a fixed shape (JSON), so code can use it |

**The big idea:** a multimodal app sends different kinds of things (picture + text) to the AI **in one go**, and the AI understands them together. In code, it's just a list with an image in it.

> ✅ **Checkpoint 3:** you can point at the lines in `src/gemini.js` where the picture and the question get put together.

---

## Part 4: make it yours (30 mins)

This is the main event. Open **`src/presets.js`**. Each block is one app from the dropdown.

1. **Copy** a whole block, from its `{` to its `},` (the Pirate tour guide one at the bottom is easiest)
2. **Paste** it just above the last `];`
3. **Change these 4 things:**
   - `name`: what shows in the dropdown
   - `systemInstruction`: who Gemini should be and how it should answer
   - `question`: the question that's filled in for you
   - `schema`: what fields you want in the JSON answer
4. **Save** (Ctrl+S / Cmd+S). The page reloads by itself and your app is in the dropdown

**Need an idea?** Plant doctor · outfit rater · "can I park here?" sign reader · homework diagram explainer · meme caption writer · "what's this dish and how do I make it?" · gym machine explainer

**Schema cheat sheet**

```js
title:   { type: Type.STRING },                          // some text
score:   { type: Type.INTEGER },                         // a whole number
price:   { type: Type.NUMBER },                          // a number with decimals
isSafe:  { type: Type.BOOLEAN },                         // true or false
tags:    { type: Type.ARRAY, items: { type: Type.STRING } },   // a list of text
mood:    { type: Type.STRING, enum: ["happy", "sad"] },  // must be one of these
```

**Page went blank after saving?** You probably deleted a comma or a bracket. Press **F12**, look at the red error in the Console, or press Ctrl+Z / Cmd+Z until it works again.

> ✅ **Checkpoint 4:** your own app is in the dropdown and it answers with your JSON fields.

---

## Part 5: put it online (bonus, 10 mins)

You need a free GitHub account for this.

1. On GitHub, create a new **public** repository (no README)
2. In your terminal, press Ctrl+C to stop the app.
3. **First time using git?** Tell it who you are (once per laptop):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
4. **Downloaded the ZIP instead of cloning?** Run `git init -b main` first, and in the next step use `git remote add` instead of `git remote set-url`.
5. Send your code to your new repo:
   ```bash
   git remote set-url origin https://github.com/YOUR-GITHUB-NAME/YOUR-REPO-NAME.git
   git add .
   git commit -m "my multimodal app"
   git push -u origin main
   ```
   If a browser window pops up asking you to sign in to GitHub, do that and it carries on.
6. On GitHub, go to your repo's **Settings > Pages**, and under **Source** pick **GitHub Actions**
7. Go to the **Actions** tab. If the run failed because Pages wasn't on yet, click it and press **Re-run all jobs**. Wait for the green tick (about a minute)
8. Your app is live at `https://YOUR-GITHUB-NAME.github.io/YOUR-REPO-NAME/`

Your key isn't in the code, so this is safe. Anyone who opens the link pastes their own key.

> ✅ **Checkpoint 5:** you've got a link you can send to a friend.

---

## Words you'll hear tonight

| word | what it means |
|---|---|
| **multimodal** | an AI that understands more than one type of input (text, pictures, audio, video) together |
| **Gemini** | Google's AI model |
| **API** | a way for your code to talk to someone else's service, here, Gemini |
| **API key** | a password that lets your code use the API |
| **SDK** | a ready-made code library that makes using the API easier (ours is `@google/genai`) |
| **prompt** | what you send to the AI: your question, plus a picture if you add one |
| **system instruction** | background rules for the AI, like "you are a chef, keep it short" |
| **streaming** | getting the answer bit by bit as it's written, instead of waiting for all of it |
| **JSON** | a tidy text format for data, like `{ "total": 12.64 }`. Easy for code to read |
| **schema** | the shape you want the JSON to have (which fields, what type) |
| **terminal** | the window where you type commands |
| **npm** | the tool that downloads code libraries and runs project commands |
| **rate limit** | the free tier's cap on how many requests you can make per minute |

---

## Help!

| what you see | what to do |
|---|---|
| `'node' is not recognized` or `command not found` | install Node from nodejs.org, then open a **new** terminal |
| `Your Node.js is ... this project needs 20.19+` | install the LTS version from nodejs.org |
| the browser didn't open | look in the terminal for a `http://localhost:...` link and open it |
| "no key yet" in red | paste your key in the top box and press **Save** |
| `API key not valid` | copy the key again from AI Studio, the whole thing, and press Save |
| `429` or "rate limit" | wait a minute, or choose **Flash-Lite** in Advanced settings |
| AI Studio says it's not available | you're on a uni or work Google account, use a personal one |
| page is blank | press F12 and read the red error, or undo your last change |
| anything else | hand up, a helper will come over |

## Before you upload anything

The free tier lets Google use what you send to improve their products. Don't upload private photos, documents or anyone else's personal info.

## Keep going after tonight

- [Getting started with the Gemini API and Web Apps](https://developers.google.com/learn/pathways/solution-ai-gemini-getting-started-web): finish the quiz for a free badge
- [Gemini API docs](https://ai.google.dev/gemini-api/docs)
- try sending audio or a PDF: same code, just a different file type
