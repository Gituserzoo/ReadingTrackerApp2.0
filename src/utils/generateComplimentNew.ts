export async function generateCompliment(): Promise<string> {
  try {
    const res = await fetch("/api/generateCompliment", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error("Failed to fetch compliment");
    const data = await res.json();
    return data.compliment;
  } catch (error) {
    console.error("Error fetching compliment:", error);
    return "You're awesome anyway!";
  }
}
