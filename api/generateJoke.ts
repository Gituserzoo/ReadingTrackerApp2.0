// api/generateJoke.ts

export default async function handler(req: Request) {
  const jokePrompts = [
    `You are a stand-up comic known for clever one-liners. Tell a short joke (1-2 sentences) that's smart, unique, and funny. Do not explain the joke. No setup or extra text.`,
    `Write a surreal or absurd joke in one sentence. Think dry wit or unexpected twists. No intro, just the joke.`,
    `Generate a short uplifting or ironic joke. Avoid common formats or clichés. Embrace originality. Output just the joke.`,
    `Come up with a joke like a clever tweet. Keep it short, punchy, and creative. Return just the joke, no extra text.`,
    `Give me a one-sentence joke that is strange but makes people smile. Humor can be dry, silly, or playful.`
  ];

  const includeBoPeep = Math.floor(Math.random() * 6) === 0;
  const basePrompt = jokePrompts[Math.floor(Math.random() * jokePrompts.length)];

  const fullPrompt = includeBoPeep
    ? basePrompt + ` Occasionally mention Bo Peep, but never reference her dating or relationships. If you include Bo Peep, make the joke smart or weird.`
    : basePrompt;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  const joke = data.choices?.[0]?.message?.content?.trim() || "No joke found.";

  return new Response(JSON.stringify({ joke }), {
    headers: { "Content-Type": "application/json" },
  });
}
