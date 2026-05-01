import { Agency } from "../types/agency";

export const MOCK_AGENCIES: Agency[] = [
  {
    id: 1,
    ownerId: 1,
    plan_id: 1,
    name: 'travel-plus',
    email: 'contact@travelplus.com',
    phone: '+970591234567',
    country: 'Palestine',
    city: 'Ramallah',
    logoUrl: null,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-01T00:00:00'
  },
  {
    id: 2,
    ownerId: 2,
    plan_id: 2,
    name: 'sky-tours',
    email: 'info@skytours.com',
    phone: '+970599876543',
    country: 'Palestine',
    city: 'Nablus',
    logoUrl: null,
    createdAt: '2024-02-01T00:00:00',
    updatedAt: '2024-02-01T00:00:00'
  },
  {
    id: 3,
    ownerId: 3,
    plan_id: 1,
    name: 'horizon-travel',
    email: 'hello@horizontravel.com',
    phone: '+970592345678',
    country: 'Jordan',
    city: 'Amman',
    logoUrl: null,
    createdAt: '2024-03-01T00:00:00',
    updatedAt: '2024-03-01T00:00:00'
  }
]
