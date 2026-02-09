import { registerHandler } from "../rpc/workerServer";
import { mergePdfTask } from "../tasks/pdf/merge";

registerHandler(mergePdfTask);
