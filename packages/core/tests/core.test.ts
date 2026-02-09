import { describe, expect, it } from "vitest";
import { WorkerPool } from "../src/worker-pool";

describe("WorkerPool", () => {
  it("acquires and releases workers", () => {
    const pool = new WorkerPool(1);
    const handle = pool.acquire();
    expect(handle?.busy).toBe(true);
    if (handle) {
      pool.release(handle);
    }
    const next = pool.acquire();
    expect(next).toBeTruthy();
  });
});
