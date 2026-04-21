export interface BreadcrumbItem {
  label: string
  href?: string
}

export type BreadcrumbMatchParams = Record<string, string>

export interface BreadcrumbBuildInput<Context> {
  pathname: string
  params: BreadcrumbMatchParams
  context: Context
}

export type BreadcrumbMatcher = (pathname: string) => BreadcrumbMatchParams | null

export interface BreadcrumbStrategy<Context> {
  id: string
  match: string | BreadcrumbMatcher
  build: (input: BreadcrumbBuildInput<Context>) => BreadcrumbItem[]
}

export interface BreadcrumbFactory<Context> {
  resolve: (input: { pathname: string; context: Context }) => BreadcrumbItem[]
}
