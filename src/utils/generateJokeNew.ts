// File: src/utils/generateJoke.ts

export async function generateJoke(): Promise<string> {
  const prompts = [
    `You are a stand-up comic known for clever one-liners. Tell a short joke (1-2 sentences) that's smart, unique, and funny. Do not explain the joke.`,
    `Write a surreal or absurd joke in one sentence.`,
    `Generate a short uplifting or ironic joke.`,
    `Come up with a joke like a clever tweet.`,
    `Give me a one-sentence joke that is strange but makes people smile.`
  ];

  const includeBoPeep = Math.floor(Math.random() * 6) === 0;
  const basePrompt = prompts[Math.floor(Math.random() * prompts.length)];
  const prompt = includeBoPeep
    ? `${basePrompt} Include Bo Peep in a smart or weird way.`
    : basePrompt;

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
        temperature: 0.9
      })
    });

    const data = await res.json();

    if (!data.choices?.[0]?.message?.content) {
      console.error("No joke returned from OpenAI", data);
      return "Oops! That joke got lost in the punchline.";
    }

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error fetching joke:", err);
    return "Why did the developer go broke? Because he used up all his cache!";
  }
}
