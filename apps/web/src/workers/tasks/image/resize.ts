export interface ResizeImagePayload {
  files: string[];
  width: number;
  height: number;
}

export async function resizeImageTask(payload: ResizeImagePayload) {
  return {
    status: "pending",
    message: `Resize scaffold for ${payload.files.length} file(s)`
  };
}
