export interface CapabilitySnapshot {
  worker: boolean;
  wasm: boolean;
  offscreenCanvas: boolean;
  deviceMemory?: number;
}

export interface CapabilityEnv {
  hasWorker: boolean;
  hasWasm: boolean;
  hasOffscreenCanvas: boolean;
  deviceMemory?: number;
}

export function detectCapabilities(env: CapabilityEnv): CapabilitySnapshot {
  return {
    worker: env.hasWorker,
    wasm: env.hasWasm,
    offscreenCanvas: env.hasOffscreenCanvas,
    deviceMemory: env.deviceMemory
  };
}
