import { registerRouter } from "../rpc/workerServer";
import { resolveRunner } from "../../lib/runnerResolver";

registerRouter({
  "tool:run": async (payload: { runner: string; input: unknown }) => {
    const fn = resolveRunner(payload.runner);
    return await fn(payload.input);
  }
});
