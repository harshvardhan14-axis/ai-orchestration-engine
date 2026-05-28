import Groq from "groq-sdk";

import { GoogleGenerativeAI }
  from "@google/generative-ai";

import OpenAI from "openai";

import { env }
  from "../utils/env";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

const gemini =
  new GoogleGenerativeAI(
    env.GEMINI_API_KEY
  );

const openrouter = new OpenAI({
  apiKey:
    env.OPENROUTER_API_KEY,

  baseURL:
    "https://openrouter.ai/api/v1",
});

export async function callGroq(
  prompt: string
) {
  const response =
    await groq.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",

          content: prompt,
        },
      ],
    });

  return response.choices[0]
    ?.message?.content;
}

export async function callGemini(
  prompt: string
) {
  const model =
    gemini.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

  const response =
    await model.generateContent(
      prompt
    );

  return response.response.text();
}

export async function callOpenRouter(
  prompt: string
) {
  const response =
    await openrouter.chat.completions.create(
      {
        model:
        "mistralai/mistral-7b-instruct:free",

        messages: [
          {
            role: "user",

            content: prompt,
          },
        ],
      }
    );

  return response.choices[0]
    ?.message?.content;
}