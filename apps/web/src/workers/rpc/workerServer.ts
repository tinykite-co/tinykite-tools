import type { WorkerRequest, WorkerResponse } from "./workerClient";

export type WorkerHandler<TInput = unknown, TOutput = unknown> = (
  payload: TInput
) => Promise<TOutput>;

export function registerHandler<TInput, TOutput>(
  handler: WorkerHandler<TInput, TOutput>
) {
  self.onmessage = async (event: MessageEvent<WorkerRequest<TInput>>) => {
    const { id, payload } = event.data;
    try {
      const result = await handler(payload);
      const response: WorkerResponse<TOutput> = { id, status: "done", payload: result };
      self.postMessage(response);
    } catch (error) {
      const response: WorkerResponse = {
        id,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      };
      self.postMessage(response);
    }
  };
}
