# Facilitator notes (for the organiser, not participants)

Building Multimodal Web Apps with the Gemini API, NK1 New King's, University of Aberdeen

## Must knows

**The basics you'll get asked about**
- **Gemini API** is Google's API for their Gemini models. **Google AI Studio** is the website where you test prompts and get keys. **Gen AI SDK** (`@google/genai`) is the JS library that calls the API
- **multimodal** = one prompt can mix text, images, audio, video, PDFs. today we do text + images
- an image goes in as a **part**: `{ inlineData: { mimeType, data } }` where data is base64. big files (over ~20MB) use the Files API instead, mention it but don't demo it
- **tokens**: roughly 4 characters of text each. images cost tokens too. free tier limits count tokens and requests
- **streaming** (`generateContentStream`) sends the answer in chunks, so it feels faster. same total time, better UX
- **system instruction** = standing rules for the model (tone, role, length). different from the user prompt
- **structured output** = `responseMimeType: "application/json"` + `responseSchema`. the model is forced to match the shape, so you can `JSON.parse` it safely. this is the bit that makes LLMs usable inside real apps, sell it hard
- **Gemini Developer API vs Vertex AI / Agent Platform**: Developer API = free tier, API key, for learning and small apps. the Cloud one = billing, enterprise. we're only using the free one

**The free tier, know this cold**
- free with a Google account, no card. models today: `gemini-3.8-flash` (default), `gemini-3.5-flash-lite` (backup, lighter)
- **limits are per project, not per key**. each person makes their own key on their own account, so everyone has their own limits. good, the room won't share one pool
- if someone hits a 429, switch them to Flash-Lite or wait a minute
- image *generation* (Nano Banana) and Pro models are **not** free. if someone asks "can it make images", say yes but it's paid tier, out of scope
- **free tier data can be used to improve Google's products.** say this out loud at the start, tell people not to upload private stuff
- check your own limits on the day at aistudio.google.com/rate-limit

**Security, say this at least twice**
- the key sits in browser code. fine on localhost for learning, **never deploy this**, anyone can read it from devtools
- the real fix: call Gemini from a server, or use **Firebase AI Logic** (Google's recommended way for web/mobile, works on the free Spark plan with the Developer API)
- `.env` is gitignored, tell people not to paste keys in Discord/WhatsApp either

**Likely questions and short answers**
- *is it really free?* yes, with rate limits. no card asked
- *which model should I use?* Flash for most stuff, Flash-Lite for speed/high volume, Pro (paid) for hard reasoning
- *Python?* same SDK exists, `pip install google-genai`, same concepts
- *how is this different from ChatGPT's API?* same idea, different provider. Gemini's selling points: long context, strong multimodal, generous free tier
- *can it do video/audio?* yes, same part structure, just a different mimeType
- *does it remember the conversation?* not by itself, you send the history each time, or use the chat helper `ai.chats.create()`
- *don't know?* "good question, let me check after" and write it down. totally fine

## Before the day

- [ ] push this repo to GitHub (public) and put the link on the event page / a QR code slide
- [ ] do the whole workshop yourself from a **fresh clone**, start to finish, twice. time each step
- [ ] check `gemini-3.8-flash` and `gemini-3.5-flash-lite` still work that morning. Google renames models a lot, if one 404s update `MODEL` in both `src/main.js` and `solutions/main.js` and push
- [ ] message attendees 2 days before: bring laptop + charger, install Node 20+, have a personal Google account ready
- [ ] test uni wifi in NK1 if you can (or know where the eduroam fallback is), and check the projector cable/adapter
- [ ] have the finished app running in a second tab as your backup demo
- [ ] grab 2 or 3 helpers from the GDG team to walk around during hands-on bits
- [ ] slides: keep to ~10, mostly code and live demo. include the repo QR, the free tier + privacy note, and the security warning
- [ ] bring a few test images on your laptop (a fridge, a receipt, a messy desk, a pet). they make the best live demos

## Run of show (2 hours, adjust to your slot)

| time | what | notes |
|---|---|---|
| 0:00 | welcome, GDG intro, what we're building | show the finished app first so people know where it's going |
| 0:10 | setup: clone, npm install, key, .env | slowest bit. helpers walk round. people done early can try prompts in AI Studio |
| 0:25 | quick talk: Gemini, AI Studio, SDK, tokens, free tier, privacy | 10 mins max, demo in AI Studio not slides |
| 0:35 | step 1 + 2: client + first text prompt | live code it, everyone types along. first answer appearing is the "it works" moment |
| 0:50 | step 3: add the image | explain parts and base64. let them try their own photos |
| 1:05 | step 4: streaming + system instruction | fun one, get people to give it personalities and share |
| 1:15 | break | |
| 1:20 | step 5: structured JSON | explain why this matters for real apps |
| 1:35 | free build: pick an idea from the README | walk around, pick 2 or 3 to show the room |
| 1:50 | demos, security reminder, next steps, pathway badge quiz, next GDG event | get photos for socials |

**If you're short on time:** skip step 4, keep step 5. JSON is the more useful skill.

## When things go wrong

- **someone's setup is broken and they're falling behind** → pair them with a neighbour, don't stop the room
- **lots of 429s** → everyone switch to `gemini-3.5-flash-lite`
- **wifi dies** → show the backup demo, explain the code, people catch up at home with the README
- **AI Studio blocked for someone** → they're on a uni Google account, use personal gmail
- **npm install fails** → usually old Node. `node -v`, needs 20+
- **live demo fails on stage** → laugh, switch to the solution tab, move on. everyone's been there

## After

- post the repo link + slides in the GDG chat
- point people at the [pathway quiz](https://developers.google.com/learn/pathways/quizzes/solution-ai-gemini-getting-started-web) for the badge
- note down questions you couldn't answer and post answers later
- check-ins on the GDG community page count for the chapter, make sure people RSVP / check in
