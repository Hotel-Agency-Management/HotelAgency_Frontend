'use client'
import { HotelsPage } from './components/HotelsPage'
import { useHotelsPage } from './hooks/useHotelsPage'

export default function Page() {
  const { hotels, handleUpdate } = useHotelsPage()
  return <HotelsPage hotels={hotels} onUpdate={handleUpdate} />
}
