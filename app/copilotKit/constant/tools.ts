export interface AgentTool {
  name: string
  availableOn: string[] 
}

export const TOOL_REGISTRY: AgentTool[] = [
  { name: 'search',           availableOn: ['Bookings', 'Rooms', 'Housekeeping', 'Reports', 'Users'] },
  { name: 'filter',           availableOn: ['Bookings', 'Rooms', 'Housekeeping', 'Reports'] },
  { name: 'navigate',         availableOn: ['*'] },
  { name: 'openModal',        availableOn: ['Bookings', 'Rooms', 'Users'] },
  { name: 'formFilling',      availableOn: ['Bookings', 'Rooms', 'Users'] },
  { name: 'reportGeneration', availableOn: ['Reports', 'Dashboard'] },
  { name: 'generateChart',    availableOn: ['Reports', 'Dashboard'] },
  { name: 'tourGuidance',     availableOn: ['*'] },
  { name: 'recommendedTool',  availableOn: ['*'] },
  { name: 'uiAppearance',     availableOn: ['*'] },
]
