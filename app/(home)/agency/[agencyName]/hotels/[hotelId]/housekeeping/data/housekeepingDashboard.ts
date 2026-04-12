export interface HousekeepingStatusCounts {
  clean: number;
  dirty: number;
  inProgress: number;
  inspected: number;
}

export interface HousekeepingDashboardSeed {
  statusCounts: HousekeepingStatusCounts;
  cleanedOverTime: {
    labels: string[];
    values: number[];
  };
  cleaningTimeByRoomType: {
    labels: string[];
    values: number[];
  };
  metricTrends: {
    totalRooms: number[];
    cleanRooms: number[];
    dirtyRooms: number[];
    inProgress: number[];
    inspected: number[];
  };
  metricChanges: {
    totalRooms: number;
    cleanRooms: number;
    dirtyRooms: number;
    inProgress: number;
    inspected: number;
  };
}

const defaultDashboardSeed: HousekeepingDashboardSeed = {
  statusCounts: {
    clean: 18,
    dirty: 11,
    inProgress: 8,
    inspected: 11
  },
  cleanedOverTime: {
    labels: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    values: [1, 2, 3, 4, 5, 4, 3, 2, 3, 1, 1, 0]
  },
  cleaningTimeByRoomType: {
    labels: ["Standard Room", "Deluxe", "Suite"],
    values: [20, 30, 45]
  },
  metricTrends: {
    totalRooms: [44, 44, 45, 46, 46, 47, 47, 48],
    cleanRooms: [10, 12, 13, 14, 15, 16, 17, 18],
    dirtyRooms: [16, 15, 15, 14, 13, 13, 12, 11],
    inProgress: [4, 5, 5, 6, 6, 7, 8, 8],
    inspected: [6, 7, 8, 9, 9, 10, 10, 11]
  },
  metricChanges: {
    totalRooms: 4,
    cleanRooms: 12,
    dirtyRooms: -18,
    inProgress: 9,
    inspected: 10
  }
};

const dashboardSeedsByHotelId: Record<string, HousekeepingDashboardSeed> = {
  "1": {
    statusCounts: {
      clean: 24,
      dirty: 9,
      inProgress: 6,
      inspected: 9
    },
    cleanedOverTime: {
      labels: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
      values: [1, 2, 4, 5, 6, 5, 3, 2, 2, 1, 1, 0]
    },
    cleaningTimeByRoomType: {
      labels: ["Standard Room", "Deluxe", "Suite"],
      values: [20, 30, 45]
    },
    metricTrends: {
      totalRooms: [45, 45, 46, 46, 47, 47, 48, 48],
      cleanRooms: [13, 15, 16, 18, 20, 22, 23, 24],
      dirtyRooms: [15, 14, 13, 12, 11, 10, 10, 9],
      inProgress: [4, 4, 5, 5, 5, 6, 6, 6],
      inspected: [6, 7, 7, 8, 8, 9, 9, 9]
    },
    metricChanges: {
      totalRooms: 3,
      cleanRooms: 14,
      dirtyRooms: -20,
      inProgress: 6,
      inspected: 8
    }
  },
  "2": {
    statusCounts: {
      clean: 21,
      dirty: 14,
      inProgress: 7,
      inspected: 10
    },
    cleanedOverTime: {
      labels: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
      values: [0, 1, 3, 4, 5, 5, 4, 3, 2, 2, 1, 0]
    },
    cleaningTimeByRoomType: {
      labels: ["Standard Room", "Deluxe", "Suite"],
      values: [19, 29, 44]
    },
    metricTrends: {
      totalRooms: [49, 50, 50, 51, 51, 52, 52, 52],
      cleanRooms: [11, 12, 14, 15, 17, 18, 20, 21],
      dirtyRooms: [19, 18, 17, 16, 16, 15, 14, 14],
      inProgress: [5, 6, 6, 6, 7, 7, 7, 7],
      inspected: [7, 8, 8, 9, 9, 10, 10, 10]
    },
    metricChanges: {
      totalRooms: 5,
      cleanRooms: 9,
      dirtyRooms: -11,
      inProgress: 7,
      inspected: 12
    }
  },
  "3": {
    statusCounts: {
      clean: 15,
      dirty: 12,
      inProgress: 9,
      inspected: 8
    },
    cleanedOverTime: {
      labels: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
      values: [1, 1, 2, 3, 4, 4, 4, 3, 2, 1, 1, 0]
    },
    cleaningTimeByRoomType: {
      labels: ["Standard Room", "Deluxe", "Suite"],
      values: [21, 32, 46]
    },
    metricTrends: {
      totalRooms: [41, 41, 42, 42, 43, 43, 44, 44],
      cleanRooms: [8, 9, 10, 11, 12, 13, 14, 15],
      dirtyRooms: [15, 15, 14, 14, 13, 13, 12, 12],
      inProgress: [6, 6, 7, 7, 7, 8, 8, 9],
      inspected: [5, 5, 6, 6, 7, 7, 8, 8]
    },
    metricChanges: {
      totalRooms: 2,
      cleanRooms: 8,
      dirtyRooms: -9,
      inProgress: 12,
      inspected: 6
    }
  }
};

export function getHousekeepingDashboardSeed(hotelId?: string) {
  if (!hotelId) {
    return defaultDashboardSeed;
  }

  return dashboardSeedsByHotelId[hotelId] ?? defaultDashboardSeed;
}
