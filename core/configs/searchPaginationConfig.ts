export interface UsePaginatedSearchOptions {
  pageSize?: number
  debounceMs?: number
}

export interface PaginatedSearchParams {
  search?: string
  pageNumber: number
  pageSize: number
}

export interface UsePaginatedSearchResult {
  search: string
  page: number
  params: PaginatedSearchParams
  handleSearch: (value: string) => void
  handlePageChange: (event: unknown, page: number) => void
}
