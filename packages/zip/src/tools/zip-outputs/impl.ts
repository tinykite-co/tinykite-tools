import type { ZipOutputsOptions } from "./types";

export function zipOutputsPlaceholder(options: ZipOutputsOptions = {}): string {
  return `zip outputs placeholder (level ${options.level ?? 6})`;
}
