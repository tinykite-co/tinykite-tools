import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const defsDir = join(repoRoot, "apps/web/src/registry/flows/defs");
const injectedDir = join(repoRoot, "apps/web/src/registry/flows/injected");
const outFile = join(repoRoot, "apps/web/src/registry/flows/generated/flows.generated.ts");

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

const defs = (await readdir(defsDir)).filter((file) => file.endsWith(".ts")).sort();
const injectedFiles = (await listFiles(injectedDir)).filter((file) => file.endsWith(".json")).sort();

const imports = defs
  .map((file, index) => `import flow${index} from "../defs/${basename(file, ".ts")}";`)
  .join("\n");

const imported = defs.map((_, index) => `  flow${index}`).join(",\n");

const injectedFlows = [];
for (const file of injectedFiles) {
  const raw = await readFile(file, "utf8");
  injectedFlows.push(JSON.parse(raw));
}

const injectedBlock = injectedFlows.length
  ? `\n  ...${JSON.stringify(injectedFlows, null, 2)}`
  : "";

const content = `${imports}\n\nexport const flows = [\n${imported}${imported && injectedBlock ? "," : ""}${injectedBlock}\n];\n\nexport const flowBySlug = new Map(flows.map((flow) => [flow.slug, flow]));\n`;

await writeFile(outFile, content, "utf8");
