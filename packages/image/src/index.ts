export interface ${pkg^}Options {
  dryRun?: boolean;
}

export function ${pkg}Placeholder(options: ${pkg^}Options = {}): string {
  const mode = options.dryRun ? "dry" : "live";
  return `${pkg} module placeholder (${mode})`;
}
