// Builds the PT and EN resume PDFs from resume/pt.json and resume/en.json
// using headless Chrome. Usage: npm run resume (CHROME_PATH overrides the binary).
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderResume } from "./template.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public");
const chrome = process.env.CHROME_PATH || "google-chrome";
const work = mkdtempSync(join(tmpdir(), "resume-"));

mkdirSync(outDir, { recursive: true });

try {
  for (const lang of ["pt", "en"]) {
    const data = JSON.parse(readFileSync(join(here, `${lang}.json`), "utf8"));
    const html = join(work, `resume-${lang}.html`);
    const pdf = join(outDir, `samuel-lincoln-resume-${lang}.pdf`);
    writeFileSync(html, renderResume(data));
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--virtual-time-budget=10000", // lets the web font load before printing
        `--user-data-dir=${join(work, "chrome")}`,
        `--print-to-pdf=${pdf}`,
        `file://${html}`,
      ],
      { stdio: "ignore" }
    );
    // Content that does not fit flows to a second page; fail instead of shipping it.
    const pages = (readFileSync(pdf, "latin1").match(/\/Type\s*\/Page\b/g) || []).length;
    if (pages !== 1) {
      throw new Error(`${pdf} has ${pages} pages; the resume must fit on one A4 page.`);
    }
    console.log(`✓ ${pdf}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
