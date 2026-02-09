import { registerHandler } from "../rpc/workerServer";
import { zipOutputsTask } from "../tasks/zip/zipOutputs";

registerHandler(zipOutputsTask);
