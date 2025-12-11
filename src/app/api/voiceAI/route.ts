import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();

  const prompt = `
You are a smart voice assistant for a study session platform.
Convert the user's voice query into structured JSON.

Supported actions:
1. search_session
2. create_session

Fields:
- title (optional)
- date (optional, yyyy-mm-dd)
- weekday (optional)
- time (optional)
- creator (optional)

Examples:
"user said: find math session tomorrow" →
{
  "action": "search_session",
  "title": "math",
  "date": "tomorrow"
}

"user said: create session about physics at 5pm" →
{
  "action": "create_session",
  "title": "physics",
  "time": "17:00"
}

Now convert the following query:
"${query}"
Return ONLY JSON.
  `;

  const ai = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await ai.json();
  const result = data.choices?.[0]?.message?.content || "{}";

  return NextResponse.json(JSON.parse(result));
}
