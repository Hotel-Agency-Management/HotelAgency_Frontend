import { TOOL_REGISTRY } from "../constant/tools";

export function getAllowedTools(page: string): string[] {
  return TOOL_REGISTRY
    .filter(tool =>
      tool.availableOn.includes('*') ||
      tool.availableOn.includes(page)
    )
    .map(tool => tool.name)
}
