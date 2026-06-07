export interface AgentToolDeps {
  search: (target: string, query: string) => void
  filter: (field: string, value: string) => void
  navigate: (path: string) => void
  openModal: (name: string) => void
  formFill: (data: Record<string, unknown>) => void
  generateReport: (type: string) => void
  generateChart: (metric: string) => void
  startTour: () => void
  getRecommendations: () => void
  setTheme: (theme: string) => void
}
