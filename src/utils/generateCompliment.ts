export async function generateCompliment(): Promise<string> {
  const res = await fetch("/api/generateCompliment", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const data = await res.json();
  return data.compliment;
}
