export function buildFeedbackUrl(params: {
  tool: string;
  version: string;
  userAgent?: string;
}) {
  const search = new URLSearchParams();
  search.set("tool", params.tool);
  search.set("version", params.version);
  if (params.userAgent) {
    search.set("ua", params.userAgent);
  }
  return `/feedback?${search.toString()}`;
}
