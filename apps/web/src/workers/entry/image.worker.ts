import { registerHandler } from "../rpc/workerServer";
import { resizeImageTask } from "../tasks/image/resize";

registerHandler(resizeImageTask);
