import { detectCapabilities } from "@tinykite/core";

const readDeviceMemory = () =>
  typeof navigator !== "undefined"
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    : undefined;

export function getCapabilities() {
  const hasWorker = typeof Worker !== "undefined";
  const hasWasm = typeof WebAssembly !== "undefined";
  const hasOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
  const deviceMemory = readDeviceMemory();
  return detectCapabilities({
    hasWorker,
    hasWasm,
    hasOffscreenCanvas,
    deviceMemory
  });
}

export function getProcessingMode(snapshot: ReturnType<typeof getCapabilities>) {
  if (snapshot.worker && snapshot.wasm) {
    return { label: "Enhanced", warning: null };
  }
  if (!snapshot.worker) {
    return { label: "Standard", warning: "Worker not available; running on main thread." };
  }
  return { label: "Standard", warning: "WebAssembly unavailable; running standard path." };
}

export function getDeviceDefaults() {
  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const isNarrow = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const memory = readDeviceMemory() ?? 0;
  return {
    compact: isCoarse || isNarrow || memory > 0 && memory <= 4,
    memory
  };
}
