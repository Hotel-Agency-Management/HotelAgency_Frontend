import { STORAGE_KEY, SIMULATED_DELAY_MS } from "../constants/form";
import { HOTEL_TERMS_STATUSES } from "../constants/status";
import type {
  HotelTermsAndConditions,
  SaveHotelTermsPayload,
} from "../types/terms";


let memoryStore: Record<string, HotelTermsAndConditions> = {
  "1": {
    id: "hotel-terms-1",
    hotelId: "1",
    title: "Standard Stay Terms",
    content:
      "Check-in begins at 3:00 PM and check-out is at 12:00 PM. Guests are responsible for any incidental charges, damage to the room, and compliance with the hotel's safety and occupancy policies. Free cancellation applies up to 48 hours before arrival unless a non-refundable rate was selected.",
    status: HOTEL_TERMS_STATUSES.ACTIVE,
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-15T14:30:00.000Z",
  },
};

const wait = (duration: number) =>
  new Promise(resolve => {
    window.setTimeout(resolve, duration);
  });

const canUseStorage = () => typeof window !== "undefined";

const readStore = () => {
  if (!canUseStorage()) {
    return memoryStore;
  }

  const savedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!savedValue) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }

  try {
    const parsed = JSON.parse(savedValue) as Record<string, HotelTermsAndConditions>;
    memoryStore = { ...memoryStore, ...parsed };
    return memoryStore;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }
};

const writeStore = (store: Record<string, HotelTermsAndConditions>) => {
  memoryStore = store;

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
};

export const hotelTermsApi = {
  getByHotelId: async (hotelId: string): Promise<HotelTermsAndConditions | null> => {
    await wait(SIMULATED_DELAY_MS);
    const store = readStore();
    return store[hotelId] ?? null;
  },

  upsert: async (
    payload: SaveHotelTermsPayload
  ): Promise<HotelTermsAndConditions> => {
    await wait(SIMULATED_DELAY_MS);

    const store = readStore();
    const currentTerms = store[payload.hotelId];
    const now = new Date().toISOString();

    const nextTerms: HotelTermsAndConditions = {
      id: currentTerms?.id ?? crypto.randomUUID(),
      hotelId: payload.hotelId,
      title: payload.title.trim(),
      content: payload.content.trim(),
      status: payload.status,
      createdAt: currentTerms?.createdAt ?? now,
      updatedAt: now,
    };

    writeStore({
      ...store,
      [payload.hotelId]: nextTerms,
    });

    return nextTerms;
  },

  deleteByHotelId: async (hotelId: string): Promise<void> => {
    await wait(SIMULATED_DELAY_MS);

    const store = readStore();

    if (!store[hotelId]) {
      return;
    }

    const nextStore = { ...store };
    delete nextStore[hotelId];
    writeStore(nextStore);
  },
};
