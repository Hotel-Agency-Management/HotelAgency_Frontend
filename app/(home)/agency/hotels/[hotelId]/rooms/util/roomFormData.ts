import { CreateRoomRequest, UpdateRoomRequest } from '../configs/roomConfig'

export function buildRoomFormData(
  data: CreateRoomRequest | UpdateRoomRequest
): FormData {
  const formData = new FormData()

  formData.append('roomTypeId', String(data.roomTypeId))
  formData.append('roomNumber', data.roomNumber)
  formData.append('floorNumber', String(data.floorNumber))
  formData.append('status', String(data.status))
  formData.append('dailyPrice', String(data.dailyPrice))
  formData.append('weeklyPrice', String(data.weeklyPrice))
  formData.append('monthlyPrice', String(data.monthlyPrice))
  formData.append('extendPrice', String(data.extendPrice))
  formData.append('capacity', String(data.capacity))

  if (data.description) formData.append('description', data.description)
  if (data.notes) formData.append('notes', data.notes)
  if (data.coverPhoto) formData.append('coverPhoto', data.coverPhoto)

  data.amenityIds.forEach((id, index) => {
    formData.append(`AmenityIds[${index}]`, String(id))
  })

  return formData
}
