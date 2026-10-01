# Snap & Ask: build a multimodal web app with the Gemini API

GDG on Campus University of Aberdeen workshop.

You'll build a small web app that takes a photo and a question, sends both to Gemini, and streams back the answer. Then you'll make it return clean JSON you could plug into a real app.

Everything here is **free**. You only need a Google account, no card, no billing.

## What you need

- a laptop with **Node.js 20 or newer** (`node -v` to check, get it from [nodejs.org](https://nodejs.org))
- a code editor (VS Code is fine)
- a personal Google account (uni accounts sometimes block AI Studio, use your gmail if so)

## Setup (10 mins)

1. Get the code
   ```bash
   git clone https://github.com/YOUR-USERNAME/gemini-multimodal-workshop.git
   cd gemini-multimodal-workshop
   npm install
   ```
   no git? click the green **Code** button on GitHub, then **Download ZIP**

2. Get a free API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and click **Create API key**

3. Copy `.env.example` to a new file called `.env` and paste your key in
   ```
   VITE_GEMINI_API_KEY=AIza...
   ```

4. Start it
   ```bash
   npm run dev
   ```
   open the link it prints (usually http://localhost:5173)

## The steps

All your work happens in `src/main.js`. Follow the TODOs in order.

| step | what you do | what you learn |
|---|---|---|
| 1 | create the client | how the Gen AI SDK talks to Gemini |
| 2 | send a text prompt | `generateContent` and `response.text` |
| 3 | add the image | multimodal prompts, images as base64 parts |
| 4 | stream the reply | `generateContentStream` and system instructions |
| 5 | get JSON back | structured output with a response schema |

Stuck? The finished code is in `solutions/main.js`, and you can see it running at http://localhost:5173/solution.html

## Ideas once you're done

- change the system instruction so it answers like a food critic, a tour guide, or a pirate
- point your camera at a receipt and pull out the items and total as JSON
- a plant or bug identifier, a "what can I cook with this fridge" app, a meme caption generator
- let users upload more than one image and compare them

## Common problems

| you see | fix |
|---|---|
| `API key not valid` | check `.env` is called exactly that (not `.env.txt`) and restart `npm run dev` |
| `429` or `RESOURCE_EXHAUSTED` | free tier rate limit, wait a minute or change `MODEL` to `gemini-3.5-flash-lite` |
| `404` model not found | model name typo in `MODEL` |
| page is blank | open the browser console (F12) and read the red error |
| AI Studio says not available | you're on a uni or work account, switch to a personal gmail |

## Important

- **Never commit your `.env`**. It's already in `.gitignore`, keep it that way
- putting a key in browser code is fine for learning on your own machine, but **don't deploy this as is**. Anyone could read your key from the page. For a real app call Gemini from a server, or use Firebase AI Logic
- free tier prompts can be used by Google to improve their products, so don't upload anything private

## Keep learning

- [Gemini API docs](https://ai.google.dev/gemini-api/docs)
- [Getting started with the Gemini API and Web Apps pathway](https://developers.google.com/learn/pathways/solution-ai-gemini-getting-started-web) (finish the quiz to get the badge)
- [Gemini cookbook](https://github.com/google-gemini/cookbook)
- [Firebase AI Logic](https://firebase.google.com/docs/ai-logic) for when you want to ship it properly
