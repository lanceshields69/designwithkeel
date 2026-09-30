import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

/** Raw text of src/styles/tokens.css, for the /design-system reference page. */
export async function readTokensCss(): Promise<string> {
  return readFile(path.join(process.cwd(), "src/styles/tokens.css"), "utf8")
}
