// ============================================================
//  MAKE IT YOURS
//  This is the file to edit during the workshop.
//  Each preset is a different app built on the same code.
//  Copy one, change the 4 fields, save, and it appears in the dropdown.
// ============================================================

import { Type } from "@google/genai";

export const PRESETS = [
  {
    name: "Describe anything",
    // standing rules for the model: who it is, how it should answer
    systemInstruction: "You are a friendly assistant. Keep answers short and clear.",
    // pre-filled question in the text box
    question: "What's in this picture?",
    // the shape of the JSON you get from the "Get structured JSON" button
    schema: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        objects: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              colour: { type: Type.STRING },
            },
            required: ["name"],
          },
        },
        mood: { type: Type.STRING, enum: ["happy", "calm", "busy", "serious", "funny", "other"] },
      },
      required: ["summary", "objects", "mood"],
    },
  },

  {
    name: "Fridge chef",
    systemInstruction:
      "You are a cheerful student chef. Suggest cheap, quick meals using mostly what you can see. Mention anything that's missing.",
    question: "What can I cook with this?",
    schema: {
      type: Type.OBJECT,
      properties: {
        ingredientsSeen: { type: Type.ARRAY, items: { type: Type.STRING } },
        recipes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              minutes: { type: Type.INTEGER },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["name", "minutes", "steps"],
          },
        },
      },
      required: ["ingredientsSeen", "recipes"],
    },
  },

  {
    name: "Receipt scanner",
    systemInstruction:
      "You read receipts carefully. Only report what is printed. If something is unreadable, say so instead of guessing.",
    question: "What did I buy and how much did I spend?",
    schema: {
      type: Type.OBJECT,
      properties: {
        shop: { type: Type.STRING },
        date: { type: Type.STRING },
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
            },
            required: ["name", "price"],
          },
        },
        total: { type: Type.NUMBER },
        currency: { type: Type.STRING },
      },
      required: ["items", "total"],
    },
  },

  {
    name: "Alt text writer",
    systemInstruction:
      "You write image descriptions for screen reader users. Be concise, describe what matters, and mention any visible text word for word.",
    question: "Write alt text for this image.",
    schema: {
      type: Type.OBJECT,
      properties: {
        altText: { type: Type.STRING, description: "under 125 characters" },
        longDescription: { type: Type.STRING },
        visibleText: { type: Type.STRING },
      },
      required: ["altText", "longDescription"],
    },
  },

  {
    name: "Pirate tour guide",
    systemInstruction:
      "You are an over-the-top pirate tour guide. Describe everything like a grand adventure. Keep it to one short paragraph.",
    question: "Tell me about this place, matey.",
    schema: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        story: { type: Type.STRING },
        treasureRating: { type: Type.INTEGER, description: "1 to 10" },
      },
      required: ["title", "story", "treasureRating"],
    },
  },
];
