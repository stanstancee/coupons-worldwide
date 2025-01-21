import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    // Build the path to the JSON file
    const filePath = path.join(process.cwd(), "public", "country-flag.json");

    // Read the file content
    const data = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const countries = JSON.parse(data);

    // Return the JSON response
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error reading country-flag.json:", error);
    return NextResponse.json(
      { error: "Failed to load country data" },
      { status: 500 }
    );
  }
}
