'use client'
import { HotelsPage } from './components/HotelsPage'
import { useHotelsPage } from './hooks/useHotelsPage'

export default function Page() {
  const { hotels, handleUpdate, handleOpen } = useHotelsPage()
  return <HotelsPage hotels={hotels} onUpdate={handleUpdate} onOpen={handleOpen} />
}
