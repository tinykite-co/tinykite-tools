import type { ResizeOptions } from "./types";

export function resizeImagePlaceholder(options: ResizeOptions): string {
  return `resize placeholder (${options.width}x${options.height})`;
}
