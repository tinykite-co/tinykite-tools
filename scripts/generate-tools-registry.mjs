import { readdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const defsDir = join(repoRoot, "apps/web/src/registry/tools/defs");
const outFile = join(repoRoot, "apps/web/src/registry/tools/generated/tools.generated.ts");

const files = (await readdir(defsDir))
  .filter((file) => file.endsWith(".ts"))
  .sort();

const imports = files
  .map((file, index) => `import tool${index} from "../defs/${basename(file, ".ts")}";`)
  .join("\n");

const list = files.map((_, index) => `  tool${index}`).join(",\n");

const content = `${imports}\n\nexport const tools = [\n${list}\n];\n\nexport const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));\n`;

await writeFile(outFile, content, "utf8");
