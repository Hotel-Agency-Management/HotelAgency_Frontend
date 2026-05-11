'use client'
import { HotelsPage } from './components/HotelsPage'
import { useHotelsPage } from './hooks/useHotelsPage'

export default function Page() {
  const {
    hotels,
    handleUpdate,
    handleOpen,
    search,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
  } = useHotelsPage()
  return (
    <HotelsPage
      hotels={hotels}
      onUpdate={handleUpdate}
      onOpen={handleOpen}
      search={search}
      onSearchChange={handleSearch}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
}
