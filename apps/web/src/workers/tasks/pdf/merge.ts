export interface MergePdfTaskPayload {
  files: string[];
}

export async function mergePdfTask(payload: MergePdfTaskPayload) {
  return {
    status: "pending",
    message: `Merge scaffold for ${payload.files.length} file(s)`
  };
}
