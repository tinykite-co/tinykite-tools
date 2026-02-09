import type { MergePdfOptions } from "./types";

export function mergePdfPlaceholder(options: MergePdfOptions = {}): string {
  return `merge placeholder (${options.pageRanges?.length ?? 0} ranges)`;
}
