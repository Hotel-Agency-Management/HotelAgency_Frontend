export interface HotelBasicInfo {
  name: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  currency: string;
  cancellationFeePercentage: number;
  coverImage: string | null
}

export interface HotelBranding {
  logo: string | null;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export interface HotelFormValues {
  basicInfo: HotelBasicInfo;
  branding: HotelBranding;
  managerId: string;
}

export interface Hotel extends HotelFormValues {
  id: string;
  agencyId?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelApiResponse {
  id: number;
  agencyId: number;
  name: string;
  country: string;
  city: string;
  address: string;
  currency: string;
  logoUrl: string | null;
  coverPath: string | null;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  managerUserId: number;
  createdAt: string;
  updatedAt: string;
  phone?: string | null;
  isActive?: boolean;
  cancellationFeeRate?: number | null;
}
