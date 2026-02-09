import tool0 from "../defs/json-prettify";
import tool1 from "../defs/title-case";
import tool2 from "../defs/word-count";

export const tools = [
  tool0,
  tool1,
  tool2
];

export const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));
