export interface ZipOutputsPayload {
  files: string[];
}

export async function zipOutputsTask(payload: ZipOutputsPayload) {
  return {
    status: "pending",
    message: `Zip scaffold for ${payload.files.length} file(s)`
  };
}
