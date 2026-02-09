export type AssetKind = "file" | "text" | "data";

export interface Asset {
  id: string;
  kind: AssetKind;
  label: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface OutputAsset extends Asset {
  fileName: string;
  data: Uint8Array;
}

export interface ProgressUpdate {
  percent: number;
  message?: string;
}

export interface ProgressEvent {
  jobId: string;
  percent: number;
  message?: string;
}

export interface JobResult<T = unknown> {
  output: T;
  assets: OutputAsset[];
}
