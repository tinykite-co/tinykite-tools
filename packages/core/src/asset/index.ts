export type AssetKind = "file" | "text" | "data";

export interface Asset {
  id: string;
  kind: AssetKind;
  label: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface ProgressUpdate {
  percent: number;
  message?: string;
}

export interface JobResult<T = unknown> {
  output: T;
  assets: Asset[];
}
