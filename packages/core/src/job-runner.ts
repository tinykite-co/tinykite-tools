import type { JobResult, ProgressUpdate } from "./models";

export type JobHandler<TInput, TOutput> = (
  input: TInput,
  onProgress?: (update: ProgressUpdate) => void
) => Promise<JobResult<TOutput>>;

export class JobRunner<TInput, TOutput> {
  constructor(private readonly handler: JobHandler<TInput, TOutput>) {}

  run(input: TInput, onProgress?: (update: ProgressUpdate) => void) {
    return this.handler(input, onProgress);
  }
}
