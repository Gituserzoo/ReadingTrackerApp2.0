// File: src/utils/generateCompliment.ts

export async function generateCompliment(): Promise<string> {
  const prompts = [
    "Write a clever, slightly backhanded compliment that still makes the person smile. Keep it under 20 words.",
    "Give a funny compliment that sounds sarcastic at first, but actually ends up feeling good. Avoid clichés.",
    "Make up a unique, lightly roast-y compliment for someone who is trying their best. Nothing generic or sappy.",
    "Write a humorous compliment that balances wit and kindness. Think: something a snarky but loving friend would say.",
    "Create a backhanded compliment that’s absurd, playful, and original — but still leaves the person feeling appreciated."
  ];

  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await res.json();

    if (!data.choices?.[0]?.message?.content) {
      console.error("No compliment returned from OpenAI", data);
      return "You're awesome anyway!";
    }

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error fetching compliment:", err);
    return "You're awesome anyway!";
  }
}

