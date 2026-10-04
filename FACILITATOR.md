# Facilitator notes (for the organiser, not participants)

Building Multimodal Web Apps with the Gemini API, NK1 New King's, University of Aberdeen

## The goal

**Everyone leaves with a working multimodal app on their own laptop that they've changed into their own idea, and they understand the one file that makes it work.**

That breaks into 4 outcomes, in order of priority:

1. **It runs** on their machine, whatever OS (or in StackBlitz if their laptop won't cooperate)
2. **They understand the trick**: a multimodal request is an array of parts (image + text) in one call. They can point at it in `src/gemini.js`
3. **They made it theirs**: at least one new preset in `src/presets.js` with their own system instruction, question and JSON schema
4. **Bonus:** it's on their GitHub, ideally live on GitHub Pages, so they can show it to someone tomorrow

If someone only hits 1 and 2, that still counts. Never let anyone leave with a broken app. The code works out of the box, so worst case they still have the original working.

## Keeping it beginner friendly

- attendees follow **WORKSHOP.md** on their own screen. it has 5 parts, each ending in a ✅ checkpoint. call the checkpoint out loud before moving on: "hands up if all three steps at the top of your page are green"
- anyone behind just skips to the next checkpoint. nothing they do can break the parts that come after
- **no photo, no problem**: the 🧾 Receipt and 📊 Chart buttons load sample pictures and switch to a matching app
- the page itself explains each control in one plain line, and the tricky bits (system instruction, model) are tucked under Advanced settings
- say the jargon once, in plain words, then use it. the glossary slide and the glossary in WORKSHOP.md use the same definitions
- never say "it's easy" or "just". say "this bit trips people up, shout if it does"

## Must knows

**The concepts**
- **Gemini API** = Google's API for Gemini models. **Google AI Studio** = website to test prompts and get keys. **Gen AI SDK** (`@google/genai`) = the JS library that calls the API
- **multimodal** = one request mixes types of input: text, images, audio, video, PDFs. today is text + images
- an image goes in as a **part**: `{ inlineData: { mimeType, data } }`, data is base64. the app shrinks photos to max 1280px first so uploads are fast
- **tokens**: about 4 characters of text each. images cost tokens too. free tier limits count requests and tokens
- **streaming** (`generateContentStream`): answer arrives in chunks, feels faster
- **system instruction**: standing rules (role, tone, length), separate from the question
- **structured output**: `responseMimeType: "application/json"` + `responseSchema` forces JSON in your exact shape. this is what makes AI usable inside real apps
- **Gemini Developer API** (free tier, API key) vs **Gemini Enterprise Agent Platform**, previously Vertex AI (billing, enterprise). we only use the free one

**The free tier**
- free with a Google account, no card. models in the app: `gemini-3.8-flash` (default) and `gemini-3.5-flash-lite` (lighter, switch to it if rate limited)
- **limits are per project, not per key**, and everyone makes their own on their own account, so the room isn't sharing one limit
- image generation (Nano Banana) and Pro models are **not** on the free tier. out of scope
- **free tier data can be used by Google to improve products.** say it at the start
- check your own limits at aistudio.google.com/rate-limit

**The key and security (know this, people will ask)**
- the key is pasted into the page and saved in that browser's localStorage. it's **not in the code**, so pushing to GitHub is safe
- this is the "bring your own key" pattern: each user uses their own key. fine for learning and personal tools, and why the GitHub Pages deploy is safe
- if you build an app where **you** pay for everyone's usage, the key must stay on a server, or use **Firebase AI Logic** (Google's recommended way for web/mobile, free Spark plan works with the Developer API)
- `.env` still works as an alternative and is gitignored

**Cross-platform, what's been checked**
- the same 4 commands work in Windows PowerShell/CMD, macOS and Linux terminals
- the lockfile includes the build tools for Windows (x64 and ARM), Mac (Intel and Apple Silicon) and Linux
- `npm install` and `npm run dev` stop with a clear message if Node is too old (needs 20.19+ or 22.12+, tell people to get 22 LTS)
- no `.env` file to create, which was the biggest Windows trap (`.env.txt`)
- iPhone HEIC photos: Safari and Mac show them, on Windows Chrome there's no preview but Gemini still reads them
- **StackBlitz fallback** (`stackblitz.com/github/YOUR-USERNAME/REPO`) runs it in Chrome/Edge with nothing installed. use it for anyone stuck more than 5 minutes

**Likely questions, short answers**
- *is it really free?* yes, with rate limits. no card asked
- *which model?* Flash for most things, Flash-Lite for speed and volume, Pro (paid) for hard reasoning
- *Python?* `pip install google-genai`, same concepts, same parts idea
- *vs OpenAI's API?* same idea, different provider. Gemini's pitch: strong multimodal, long context, generous free tier
- *video or audio?* same parts structure, different mimeType. big files go through the Files API
- *does it remember the conversation?* not by itself. you resend the history, or use `ai.chats.create()`
- *can I use this in my uni project?* yes, it's Apache 2.0
- *don't know?* "good one, I'll check and post it in the chat". write it down

## Before the day

- [ ] create a **public** GitHub repo, push this, replace `YOUR-USERNAME` in the README (clone link and StackBlitz link)
- [ ] make a QR code to the repo for the slides
- [ ] do a full run **from a fresh clone on a Windows machine and a Mac** if you can borrow one. at minimum your own laptop, twice
- [ ] open the StackBlitz link once yourself and check it boots and answers
- [ ] morning of: check both model names still work. if one 404s, change the `<option>` values in `index.html` and push
- [ ] message attendees 2 days before: laptop + charger, install **Node 22 LTS** from nodejs.org, have a personal Google account, optional GitHub account
- [ ] test NK1 wifi (eduroam) and the projector cable/adapter
- [ ] 2 or 3 GDG helpers, one assigned to "StackBlitz rescue"
- [ ] bring 5 test photos: fridge, receipt, messy desk, a sign, a pet. test each one with each preset beforehand

## Run of show (2 hours, adjust to your slot)

| time | what | outcome |
|---|---|---|
| 0:00 | welcome, GDG intro, **live demo of the finished app** | everyone sees the destination |
| 0:10 | **get it running**: clone, `npm install`, `npm run dev`, get key, paste, Save | outcome 1. helpers roam. stuck 5+ mins → StackBlitz |
| 0:30 | everyone tries the 🧾 Receipt sample, then their own photos (WORKSHOP.md part 2) | first "it works" moment, checkpoint 1 and 2 |
| 0:40 | **read the code together**: open `src/gemini.js`, go step by step with the slides | outcome 2 |
| 1:05 | break | |
| 1:10 | **make it yours**: walk through adding one preset live, then they build their own | outcome 3 |
| 1:40 | **ship it** (optional): push to GitHub, turn on Pages | outcome 4 |
| 1:50 | 3 or 4 demos from the room, security reminder, badge quiz, next event | photos for socials |

**Short on time?** Cut "ship it". Never cut "make it yours". That's what they leave with.

## Reading `src/gemini.js` together (the teaching bit)

Go top to bottom, it's written in this order on purpose:

1. **client**: `new GoogleGenAI({ apiKey })`. one line
2. **text only**: contents can just be a string. show it by removing the image and asking again
3. **multimodal**: `buildContents()` returns `[imagePart, textPart]`. **this is the whole point of the workshop**, spend the most time here
4. **streaming**: `generateContentStream` + `for await`. same answer, arrives in chunks
5. **JSON**: same call plus `responseMimeType` + `responseSchema`. then show `presets.js` where the schemas live

A nice moment: open devtools, Network tab, press Ask, click the request. They can see the actual parts going over the wire.

## When things go wrong

- **someone's laptop won't install** → StackBlitz, straight away. don't debug for 15 minutes
- **lots of 429s** → everyone switch the dropdown to Flash-Lite
- **wifi dies** → keep explaining from slides and the code, they can run it at home with the README
- **AI Studio blocked** → uni Google account. use personal gmail
- **"node not recognized"** on Windows → installed Node but didn't open a new terminal. close and reopen
- **live demo fails** → laugh, refresh, try another photo, move on

## After

- post the repo link + slides in the GDG chat
- point people at the [pathway quiz](https://developers.google.com/learn/pathways/quizzes/solution-ai-gemini-getting-started-web) for the badge
- post answers to questions you couldn't answer
- make sure people checked in on the GDG community page
- ask people to share their live GitHub Pages links, great for socials
