// File: src/pages/api/generateCompliment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prompts = [
    "Write a clever, slightly backhanded compliment that still makes the person smile. Keep it under 20 words.",
    "Give a funny compliment that sounds sarcastic at first, but actually ends up feeling good. Avoid clichés.",
    "Make up a unique, lightly roast-y compliment for someone who is trying their best. Nothing generic or sappy.",
    "Write a humorous compliment that balances wit and kindness. Think: something a snarky but loving friend would say.",
    "Create a backhanded compliment that’s absurd, playful, and original — but still leaves the person feeling appreciated."
  ];

  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      })
    });

    const data = await openaiRes.json();
    const compliment = data.choices?.[0]?.message?.content?.trim();

    if (!compliment) throw new Error('No compliment returned');

    res.status(200).json({ compliment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate compliment' });
  }
}
