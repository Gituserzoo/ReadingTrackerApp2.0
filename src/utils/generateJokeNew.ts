export async function generateJoke(): Promise<string> {
  try {
    const res = await fetch("/api/generateJoke", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error("Failed to fetch joke");
    const data = await res.json();
    return data.joke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "Why did the developer go broke? Because he used up all his cache!";
  }
}
