import { create } from 'zustand'
import type { HotelFormValues } from '../types/hotel'
import { MOCK_HOTELS } from '../data/mockHotels';

type Hotel = HotelFormValues & { id: string; isActive: boolean }

interface HotelStore {
  hotels: Hotel[]
  isLoading: boolean
  addHotel: (hotel: HotelFormValues) => Promise<void>
  deleteHotel: (id: string) => Promise<void>
  updateHotel: (id: string, hotel: HotelFormValues) => Promise<void>
  getHotelById: (id: string) => Hotel | undefined
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  hotels: MOCK_HOTELS,
  isLoading: false,

  addHotel: async (hotel) => {
    set({ isLoading: true })
    try {
      // TODO: replace with → const res = await api.post('/hotels', hotel)
      const newHotel: Hotel = { ...hotel, id: crypto.randomUUID(), isActive: true }
      set((state) => ({ hotels: [...state.hotels, newHotel] }))
    } finally {
      set({ isLoading: false })
    }
  },

  deleteHotel: async (id) => {
    set({ isLoading: true })
    try {
      // TODO: replace with → await api.delete(`/hotels/${id}`)
      set((state) => ({ hotels: state.hotels.filter((h) => h.id !== id) }))
    } finally {
      set({ isLoading: false })
    }
  },

  updateHotel: async (id, hotel) => {
    set({ isLoading: true })
    try {
      // TODO: replace with → const res = await api.put(`/hotels/${id}`, hotel)
      set((state) => ({
        hotels: state.hotels.map((h) => (h.id === id ? { ...h, ...hotel } : h)),
      }))
    } finally {
      set({ isLoading: false })
    }
  },

  getHotelById: (id) => get().hotels.find((h) => h.id === id),
}))
