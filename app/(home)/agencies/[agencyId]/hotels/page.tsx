'use client'
import { useParams } from 'next/navigation'
import { HotelsPage } from '@/app/(home)/agency/hotels/components/HotelsPage'
import { useAdminHotelsPage } from '@/app/(home)/agency/hotels/hooks/useAdminHotelsPage'

export default function Page() {
  const params = useParams()
  const agencyId = Number(params.agencyId)
  const { hotels, handleAdd, handleUpdate, handleOpen } = useAdminHotelsPage(agencyId)
  return (
    <HotelsPage
      hotels={hotels}
      onUpdate={handleUpdate}
      onOpen={handleOpen}
      onAdd={handleAdd}
    />
  )
}
