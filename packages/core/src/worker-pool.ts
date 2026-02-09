export interface WorkerHandle {
  id: string;
  busy: boolean;
}

export class WorkerPool {
  private readonly workers: WorkerHandle[];

  constructor(size: number) {
    this.workers = Array.from({ length: size }, (_, index) => ({
      id: `worker-${index + 1}`,
      busy: false
    }));
  }

  acquire(): WorkerHandle | undefined {
    const available = this.workers.find((worker) => !worker.busy);
    if (available) {
      available.busy = true;
    }
    return available;
  }

  release(handle: WorkerHandle): void {
    const worker = this.workers.find((entry) => entry.id === handle.id);
    if (worker) {
      worker.busy = false;
    }
  }
}
