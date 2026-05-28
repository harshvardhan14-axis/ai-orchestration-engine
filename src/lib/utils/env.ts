export const env = {
  GROQ_API_KEY:
    process.env.GROQ_API_KEY || "",

  GEMINI_API_KEY:
    process.env.GEMINI_API_KEY || "",

  OPENROUTER_API_KEY:
    process.env.OPENROUTER_API_KEY || "",

  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
};