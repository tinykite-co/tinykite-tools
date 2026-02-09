import { CancelledError } from "@tinykite/core";
import type { WorkerRequest, WorkerResponse } from "../workers/rpc/workerClient";
import { resolveRunner } from "./runnerResolver";

export async function runOnMain(runner: string, input: unknown, signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new CancelledError();
  }
  const fn = resolveRunner(runner);
  return await fn(input);
}

export function runInWorker(
  runner: string,
  input: unknown,
  signal?: AbortSignal
): Promise<unknown> {
  if (signal?.aborted) {
    return Promise.reject(new CancelledError());
  }
  const worker = new Worker(new URL("../workers/entry/tools.worker.ts", import.meta.url), {
    type: "module"
  });
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      worker.removeEventListener("message", onMessage);
      worker.removeEventListener("error", onError);
      worker.terminate();
    };

    const onMessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id !== id) return;
      cleanup();
      if (event.data.status === "error") {
        reject(new Error(event.data.error ?? "Worker error"));
      } else {
        resolve(event.data.payload);
      }
    };

    const onError = () => {
      cleanup();
      reject(new Error("Worker execution failed"));
    };

    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);

    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          cleanup();
          reject(new CancelledError());
        },
        { once: true }
      );
    }

    const request: WorkerRequest = {
      id,
      type: "tool:run",
      payload: { runner, input }
    };

    worker.postMessage(request);
  });
}
