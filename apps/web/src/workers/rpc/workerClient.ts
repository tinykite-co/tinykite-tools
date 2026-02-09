export interface WorkerRequest<T = unknown> {
  id: string;
  type: string;
  payload: T;
}

export interface WorkerResponse<T = unknown> {
  id: string;
  status: "pending" | "done" | "error";
  payload?: T;
  error?: string;
}

export function postWorkerMessage(worker: Worker, request: WorkerRequest) {
  worker.postMessage(request);
}
