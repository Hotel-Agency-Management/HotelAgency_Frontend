import { useGenerateChartTool } from "../tools/chart"
import { useFilterTool } from "../tools/filter"
import { useFormFillingTool } from "../tools/formFill"
import { useOpenModalTool } from "../tools/modal"
import { useNavigateTool } from "../tools/navigate"
import { useRecommendedTool } from "../tools/recommended"
import { useReportGenerationTool } from "../tools/report"
import { useSearchTool } from "../tools/search"
import { useUiAppearanceTool } from "../tools/theme"
import { useTourGuidanceTool } from "../tools/tour"
import { AgentToolDeps } from "../types/deps"


export function useAgentTools(deps: AgentToolDeps) {
  useSearchTool(deps.search)
  useFilterTool(deps.filter)
  useNavigateTool(deps.navigate)
  useOpenModalTool(deps.openModal)
  useFormFillingTool(deps.formFill)
  useReportGenerationTool(deps.generateReport)
  useGenerateChartTool(deps.generateChart)
  useTourGuidanceTool(deps.startTour)
  useRecommendedTool(deps.getRecommendations)
  useUiAppearanceTool(deps.setTheme)
}
