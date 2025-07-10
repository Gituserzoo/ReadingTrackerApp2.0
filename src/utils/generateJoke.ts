export async function generateJoke(): Promise<string> {
  const res = await fetch("/api/generateJoke", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const data = await res.json();
  return data.joke;
}
