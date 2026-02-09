import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const baseDir = join(repoRoot, "apps/web/src/registry/templates/base");
const injectedDir = join(repoRoot, "apps/web/src/registry/templates/injected");
const outFile = join(repoRoot, "apps/web/src/registry/templates/generated/templates.generated.ts");

async function listFiles(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function loadJsonFiles(dir) {
  const files = (await listFiles(dir)).filter((file) => extname(file) === ".json").sort();
  const items = [];
  for (const file of files) {
    const raw = await readFile(file, "utf8");
    items.push(JSON.parse(raw));
  }
  return items;
}

const baseTemplates = await loadJsonFiles(baseDir);
const injectedTemplates = await loadJsonFiles(injectedDir);

const content = `export const templates = ${JSON.stringify(
  [...baseTemplates, ...injectedTemplates],
  null,
  2
)} as const;\n`;

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, content, "utf8");
