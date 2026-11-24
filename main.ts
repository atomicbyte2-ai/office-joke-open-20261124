// SPDX-License-Identifier: MIT
// Office Joke Open entry: writes a single-line office joke to entry.txt.
//
// The joke is the whole entry. It must be one line, 1-200 characters,
// UTF-8, and about office life. The program validates that before writing,
// then reads the file back and checks the round trip byte for byte.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const JOKE =
  "We moved the meeting to an email, then someone replied-all to the email asking for a meeting.";

// Count code points, not UTF-16 units, so the gate's 200-character limit
// is checked the way a reader sees it.
const charCount = [...JOKE].length;

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "entry.txt");

if (charCount < 1 || charCount > 200) {
  throw new Error(`joke must be 1-200 characters, got ${charCount}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}
if (JOKE.includes("\n")) {
  throw new Error("joke must be a single line");
}

writeFileSync(outPath, JOKE, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== JOKE) {
  throw new Error("entry.txt round trip mismatch");
}
console.log(`Wrote ${charCount} characters to ${outPath}`);
